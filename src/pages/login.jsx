import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLoginFormValue } from '../services/actions/form'; 
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, Redirect, useLocation } from 'react-router-dom';
import { login } from '../services/actions/auth';
import { AuthForm } from '../components/auth-form';

export const LoginPage = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const { email, password } = useSelector(state => state.form.login);
  const { loggedIn } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const location = useLocation();

  if (loggedIn) {
    const { from } = location.state || { from: { pathname: "/" } }
    return (
      <Redirect to={from} />
  )}

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  }
  const onFormChange = (e) => {
    dispatch(setLoginFormValue(e.target.name, e.target.value))
  }

  const RegisterLink = () => (
    <p className="text text_type_main-default text_color_inactive mt-20">
      Вы — новый пользователь?&ensp;
      <Link to='/register'>Зарегистрироваться</Link>
    </p>
  )
  const ResetLink = () => (
    <p className="text text_type_main-default text_color_inactive">
      Забыли пароль?&ensp;
      <Link to='/forgot-password'>Восстановить пароль</Link>
    </p>
  )

  return (
    <AuthForm title="Вход">
      <Input
        type={'text'}
        placeholder={'E-mail'}
        onChange={onFormChange}
        value={email}
        icon={'EditIcon'}
        name={'email'}
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
        Войти
      </Button>
      <RegisterLink />
      <ResetLink />
    </AuthForm>
)}

