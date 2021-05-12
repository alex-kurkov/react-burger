import { useContext } from 'react';
import PropTypes from 'prop-types';
import { ChosenIngredientsContext } from '../../context/appContext';
import { 
  CurrencyIcon, CloseIcon, LockIcon, DragIcon 
} from '@ya.praktikum/react-developer-burger-ui-components/dist/index.js';
import styles from './constructor-element.module.css'
import './constructor-element.module.css';

const ConstructorElement = ({ type, text, thumbnail, price, isLocked, _id }) => {
  const { dispatchChosenIngredients } = useContext(ChosenIngredientsContext);
  const positionStyle = styles[`position_${type}`];
  const positionBorderStyle = styles[`border_style_${type}`]
  const action = isLocked ? (
      <LockIcon type="primary" />
  ) : (
      <CloseIcon type="primary" onClick={() => dispatchChosenIngredients({type: 'remove', payload: {_id}})} />
  );

  return (
    <div className={`${styles.element} ${positionStyle}`}>
      <div className={styles.drag}> 
        { type === 'center' && 
          <DragIcon type="primary"/>
        }
      </div>
      <div className={`${styles.content} ${positionBorderStyle}`}>
        <img className={styles.image} src={thumbnail} alt={text} />
        <span className={`${styles.text} text`}>{text}</span>
        <span className={styles.price}>
          {price}
          <CurrencyIcon type="primary" />
        </span>
        <span className={styles.action}>{action}</span>
      </div>
    </div>
  );
};

ConstructorElement.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  thumbnail: PropTypes.string,
  price: PropTypes.number,
  isLocked: PropTypes.bool,
  handleClose: PropTypes.func,
  _id: PropTypes.string,
}
export default ConstructorElement;
