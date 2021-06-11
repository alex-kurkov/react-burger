import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button  } from '@ya.praktikum/react-developer-burger-ui-components';
import { modifyUser } from '../../services/actions/auth';
import styles from './styles.module.css';

export const ProfileEdit = () => {
  const dispatch = useDispatch();
  const { name, email } = useSelector(state => state.user)
  const [ values, setValues ] = useState({
    name,
    email,
    password: '',
  })
  const [ disabled, setDisabled ] = useState({
    name: true,
    email: true,
    password: true,
  })

  const onFormChange = e => {
    setValues({...values, [e.target.name]: e.target.value })
  }
  const toggleInputDisability = field => {
    setDisabled({...disabled, [field]: !disabled[field] })
  }
  const resetForm = (e) => {
    e.preventDefault();
    setValues({
      name,
      email,
      password: '',
    });
    setDisabled({
      name: true,
      email: true,
      password: true,
    })
  }
  const onFormSubmit = (e) => {
    e.preventDefault();
    const data = {}
    if (values.name && values.name !== name) data.name = values.name;
    if (values.email && values.email !== email) data.email = values.email;
    if (values.password) data.password = values.password;
    dispatch(modifyUser(data));
  }
  
  return (
    <form className={styles.form}>
      <Input
        disabled={disabled.name}
        type={'text'}
        placeholder={'Имя'}
        onChange={onFormChange}
        icon={'EditIcon'}
        value={values.name}
        name={'name'}
        error={false}
        onIconClick={() => toggleInputDisability('name')}
        errorText={'Ошибка'}
        size={'default'}
      />
      <Input
        disabled={disabled.email}
        type={'text'}
        placeholder={'Логин'}
        onChange={onFormChange}
        icon={'EditIcon'}
        value={values.email}
        name={'email'}
        error={false}
        onIconClick={() => toggleInputDisability('email')}
        errorText={'Ошибка'}
        size={'default'}
      />
      <Input
        disabled={disabled.password}
        type={'password'}
        placeholder={'Пароль'}
        onChange={onFormChange}
        icon={'EditIcon'}
        value={values.password}
        name={'password'}
        error={false}
        onIconClick={() => toggleInputDisability('password')}
        errorText={'Ошибка'}
        size={'default'}
      />
      <div className={styles.buttonsWrap}>
        <Button type="secondary" size="large" onClick={resetForm}>
          Отмена
        </Button>
        <Button type="primary" size="large" onClick={onFormSubmit}>
          Сохранить
        </Button>
      </div>
    </form>
  )
}