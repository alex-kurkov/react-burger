import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setRegisterFormValue } from '../services/actions/form'; 
import { register } from '../services/actions/auth';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { AuthForm } from '../components/auth-form'

export const RegisterPage = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const { name, email, password } = useSelector(state => state.form.register);
  const dispatch = useDispatch();

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ name, email, password }));
  }
  const onFormChange = (e) => {
    dispatch(setRegisterFormValue(e.target.name, e.target.value))
  }

  const LoginLink = () => (
    <p className="text text_type_main-default text_color_inactive mt-20">
      Уже зарегистрированы?&ensp;
      <Link to='/login'>Войти</Link>
    </p>
  )

  return (
    <AuthForm title="Регистрация">
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={onFormChange}
        value={name}
        name={'name'}
        icon={'EditIcon'}
        error={false}
        errorText={''}
    />
      <Input
        type={'text'}
        placeholder={'E-mail'}
        onChange={onFormChange}
        value={email}
        name={'email'}
        icon={'EditIcon'}
        error={false}
        errorText={''}
    />
      <Input
        type={passwordShown ? 'text' : 'password'}
        placeholder={'Пароль'}
        onChange={onFormChange}
        icon={passwordShown ? 'HideIcon' : 'ShowIcon'}
        value={password}
        name={'password'}
        error={false}
        onIconClick={() => { setPasswordShown(!passwordShown) }}
        errorText={'Ошибка'}
        size={'default'}
    />
      <Button type="primary" size="large" onClick={onFormSubmit}>
        Зарегистрироваться
      </Button>
      <LoginLink />
    </AuthForm>
)}

