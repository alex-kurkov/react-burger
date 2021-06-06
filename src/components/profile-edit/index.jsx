import { useSelector, useDispatch } from 'react-redux';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css';

export const ProfileEdit = () => {
  const { name, email, password } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const onFormChange = (e) => {
    console.log('form changed, without actions yet');
      /*     dispatch(setEditProfileFormValue(e.target.name, e.target.value)) */
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
        onIconClick={onFormChange}
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
        onIconClick={onFormChange}
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
        onIconClick={onFormChange}
        errorText={'Ошибка'}
        size={'default'}
      />
    </form>
  )
}