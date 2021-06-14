import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import {
  CurrencyIcon, CloseIcon, LockIcon, DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components/dist/index';
import styles from './constructor-element.module.css';

const TargetElement = ({ index, children, type }) => {
  const dispatch = useDispatch();
  const handleIndredientSort = (positionIndex, targetIndex) => {
    dispatch({ type: 'ELEMENT_SORTED_BY_DND', payload: { positionIndex, targetIndex } });
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

const ConstructorElement = ({
  item, positionIndex, type, isLocked,
}) => {
  const dispatch = useDispatch();
  const positionStyle = styles[`position_${type}`];
  const positionBorderStyle = styles[`border_style_${type}`];
  const action = isLocked ? (
    <LockIcon type="primary" />
  ) : (
    <CloseIcon type="primary" onClick={() => dispatch({ type: 'REMOVE_CHOSEN_INGREDIENT', payload: { positionIndex } })} />
  );

  const text = item.type !== 'bun'
    ? item.name
    : type === 'top'
      ? `${item.name} (верх)`
      : `${item.name} (низ)`;

  // eslint-disable-next-line no-shadow
  const DraggableElement = ({ item }) => {
    const [{ dragged }, dragRef] = useDrag({
      type: 'sortedIngredient',
      item: { graggedIndex: positionIndex },
      collect: (monitor) => ({
        dragged: monitor.isDragging(),
      }),
    });
    return (
      <div ref={item.type !== 'bun' ? dragRef : null} className={`${styles.element} ${positionStyle} ${dragged ? styles.dragged : ''}`}>
        <div className={styles.drag}>
          { type === 'center'
            && <DragIcon type="primary" />}
        </div>
        <div className={`${styles.content} ${positionBorderStyle}`}>
          <img className={styles.image} src={item.image} alt={item.name} />
          <span className={`${styles.text} text`}>{text}</span>
          <span className={styles.price}>
            {item.price}
            <CurrencyIcon type="primary" />
          </span>
          <span className={styles.action}>{action}</span>
        </div>
      </div>
    );
  };

  return (
    <TargetElement index={positionIndex} type={item.type}>
      <DraggableElement item={item} />
    </TargetElement>
  );
};

ConstructorElement.propTypes = {
  item: PropTypes.shape({
    type: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.number,
  }),
  positionIndex: PropTypes.number,
  type: PropTypes.string,
  isLocked: PropTypes.bool,
};
TargetElement.propTypes = {
  index: PropTypes.number,
  children: PropTypes.node,
  type: PropTypes.oneOf(['bun', 'sauce', 'main']),
};

export default ConstructorElement;
