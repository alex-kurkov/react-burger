import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from "react-dnd";
import PropTypes from 'prop-types';
import { 
  CurrencyIcon, CloseIcon, LockIcon, DragIcon 
} from '@ya.praktikum/react-developer-burger-ui-components/dist/index.js';
import styles from './constructor-element.module.css'
import './constructor-element.module.css';

const ConstructorElement = ({ key = 'none', item, positionIndex, type, isLocked }) => {
  const dispatch = useDispatch();
  const positionStyle = styles[`position_${type}`];
  const positionBorderStyle = styles[`border_style_${type}`]
  const action = isLocked ? (
      <LockIcon type="primary" />
  ) : (
      <CloseIcon type="primary" onClick={() => dispatch({type: 'REMOVE_CHOSEN_INGREDIENT', payload: {positionIndex}})} />
  );

  const text = item.type !== 'bun'
    ? item.name
    : type === 'top'
    ? `${item.name} (верх)`
    : `${item.name} (низ)`

  const TargetElement = ({ index, children }) => {
    const handleIndredientSort = (positionIndex, targetIndex) => {
      dispatch({type: 'ELEMENT_SORTED_BY_DND', payload: {positionIndex, targetIndex}})
    }
    const [{ hoveredTarget }, dropTarget] = useDrop({
      accept: "sortedIngredient",
      drop({ graggedIndex }) {
        handleIndredientSort(graggedIndex, index);
      },
      collect: monitor => ({
        hoveredTarget: monitor.isOver(),
      })
    });
    return (
      <li key={key} ref={item.type !== 'bun' ? dropTarget : null} className={`${styles.listItem} ${hoveredTarget ? styles.hovered : ''} mb-2`} >
        { children }
      </li>
  )}

  const DraggableElement = () => {
    const [{ dragged }, dragRef] = useDrag({
      type: 'sortedIngredient',
      item: { graggedIndex: positionIndex },
      collect: monitor => ({
        dragged: monitor.isDragging(),
      })
    });
    return(
      <div ref={item.type !== 'bun' ? dragRef : null} className={`${styles.element} ${positionStyle} ${dragged ? styles.dragged : ''}`}>
        <div className={styles.drag}> 
          { type === 'center' && 
            <DragIcon type="primary"/>
          }
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
    )
  }

  return (
    <TargetElement index={positionIndex} >
      <DraggableElement />
    </TargetElement>
  );
};

ConstructorElement.propTypes = {
  item: PropTypes.shape({}),
  positionIndex: PropTypes.number,
  type: PropTypes.string,
  isLocked: PropTypes.bool,
  key: PropTypes.string
}
export default ConstructorElement;
