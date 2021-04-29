import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/index.js';
import styles from './modal.module.css';

const Modal = ({title = '', onClose, children = null}) => {
  return (
    <div className={`${styles.modal} p-5`}>
      <div className={`${styles.title_icon_wrap}`}>
        <h3 className="text text_type_main-large mr-4">{title}</h3>
        <CloseIcon type="primary" onClick={onClose}/>
      </div>
      {children}
    </div>
  )
}

Modal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.node,
}

export default Modal;
