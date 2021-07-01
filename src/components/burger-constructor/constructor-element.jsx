/* eslint-disable no-unused-vars */
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import {
  DragIcon, ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components/dist/index';
import styles from './constructor-element.module.css';
import {
  sortIngredients,
  removeIngredient,
} from '../../services/reducers/cart/cartSlice';

const TargetElement = ({ index, children, type }) => {
  const dispatch = useDispatch();
  const handleIndredientSort = (positionIndex, targetIndex) => {
    dispatch(sortIngredients({ positionIndex, targetIndex }));
  };
  const [{ hoveredTarget }, dropTarget] = useDrop({
    accept: 'sortedIngredient',
    drop({ graggedIndex }) {
      handleIndredientSort(graggedIndex, index);
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

const Constructor = ({
  item, positionIndex, type, isLocked,
}) => {
  const text = item.type !== 'bun'
    ? item.name
    : type === 'top'
      ? `${item.name} (верх)`
      : `${item.name} (низ)`;

  // eslint-disable-next-line no-shadow
  const DraggableElement = ({ item }) => {
    const dispatch = useDispatch();
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
          { type === 'center'
            && <DragIcon type="primary" />}
        </div>
        <ConstructorElement
          handleClose={() => dispatch(removeIngredient({ positionIndex }))}
          type={type}
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

Constructor.propTypes = {
  item: PropTypes.shape({
    type: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  positionIndex: PropTypes.number,
  type: PropTypes.string.isRequired,
  isLocked: PropTypes.bool.isRequired,
};
TargetElement.propTypes = {
  index: PropTypes.number,
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['bun', 'sauce', 'main']).isRequired,
};

export default Constructor;
