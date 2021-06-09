import { useSelector } from 'react-redux';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css';
import { setProfileFormValue } from '../../services/actions/form';
import { modifyUser } from '../../services/actions/auth';
import { useDispatch } from 'react-redux';


export const ProfileEdit = () => {
  const { name, email, password } = useSelector(state => state.form.profile );
  const dispatch = useDispatch();

  const onFormChange = e => {
    e.preventDefault();
    dispatch(setProfileFormValue(e.target.name, e.target.value))
  }
  const onFormSubmit = data => {
    dispatch(modifyUser(data));
  }
  
  return (
    <form className={styles.form}>
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={onFormChange}
        icon={'EditIcon'}
        value={name}
        name={'name'}
        error={false}
        onIconClick={() => onFormSubmit({ name })}
        errorText={'Ошибка'}
        size={'default'}
      />
      <Input
        type={'text'}
        placeholder={'Логин'}
        onChange={onFormChange}
        icon={'EditIcon'}
        value={email}
        name={'email'}
        error={false}
        onIconClick={() => onFormSubmit({ email })}
        errorText={'Ошибка'}
        size={'default'}
      />
      <Input
        type={'password'}
        placeholder={'Пароль'}
        onChange={onFormChange}
        icon={'EditIcon'}
        value={password}
        name={'password'}
        error={false}
        onIconClick={() => onFormSubmit({ password })}
        errorText={'Ошибка'}
        size={'default'}
      />
    </form>
  )
}