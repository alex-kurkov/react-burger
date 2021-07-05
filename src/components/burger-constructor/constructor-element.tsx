import { FC } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import {
  DragIcon, ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components/dist/index';
import styles from './constructor-element.module.css';
import {
  sortIngredients,
  removeIngredient,
} from '../../services/reducers/cart/cartSlice';
import { IIngredient } from '../../types';
import { useAppDispatch } from '../../hooks';
import { countIngredientsInCart } from '../../services/reducers/content/contentSlice';

const TargetElement: FC<{ index: number, type: string }> = ({ index, children, type }) => {
  const dispatch = useAppDispatch();
  const handleIndredientSort = (positionIndex: number, targetIndex: number) => {
    dispatch(sortIngredients({ positionIndex, targetIndex }));
  };
  const [{ hoveredTarget }, dropTarget] = useDrop({
    accept: 'sortedIngredient',
    drop(item: any) {
      handleIndredientSort(item.graggedIndex, index);
    },
    collect: (monitor) => ({
      hoveredTarget: monitor.isOver(),
    }),
  });
  return (
    <li ref={type !== 'bun' ? dropTarget : null} className={`${styles.listItem} ${hoveredTarget ? styles.hovered : ''} mb-2`}>
      { children }
    </li>
  );
};

const Constructor: FC<{
  item: IIngredient, positionIndex: number, position?: 'top' | 'bottom', isLocked: boolean,
}> = ({
  item, positionIndex, position, isLocked,
}) => {
  const text = item.type !== 'bun'
    ? item.name
    : position === 'top'
      ? `${item.name} (верх)`
      : `${item.name} (низ)`;

  // eslint-disable-next-line no-shadow
  const DraggableElement: FC<{item: IIngredient}> = ({ item }) => {
    const dispatch = useAppDispatch();
    const [{ dragged }, dragRef] = useDrag({
      type: 'sortedIngredient',
      item: { graggedIndex: positionIndex },
      collect: (monitor) => ({
        dragged: monitor.isDragging(),
      }),
    });
    return (
      <div ref={item.type !== 'bun' ? dragRef : null} className={`${styles.element} ${dragged ? styles.dragged : ''}`}>
        <div className={styles.drag}>
          { !position
            && <DragIcon type="primary" />}
        </div>
        <ConstructorElement
          handleClose={() => {
            dispatch(removeIngredient({ positionIndex }))
            dispatch(countIngredientsInCart({isDel: true, id: item._id}))
          }}
          type={position}
          isLocked={isLocked}
          text={text}
          price={item.price}
          thumbnail={item.image}
        />
      </div>
    );
  };

  return (
    <TargetElement index={positionIndex} type={item.type}>
      <DraggableElement item={item} />
    </TargetElement>
  );
};

export default Constructor;
