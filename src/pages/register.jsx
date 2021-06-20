import { useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { setRegisterFormValue } from '../services/reducers/form/formSlice';
import { register } from '../services/actions/auth';
import { AuthForm } from '../components/auth-form';

export const RegisterPage = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const { name, email, password } = useSelector((state) => state.form.register);
  const { loggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();

  if (loggedIn) {
    const { from } = location.state || { from: { pathname: '/' } };
    return (
      <Redirect to={from} />
    );
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ name, email, password }));
  };
  const onFormChange = (e) => {
    dispatch(setRegisterFormValue({ key: e.target.name, value: e.target.value }));
  };

  const LoginLink = () => (
    <p className="text text_type_main-default text_color_inactive mt-20">
      Уже зарегистрированы?&ensp;
      <Link to="/login">Войти</Link>
    </p>
  );

  return (
    <AuthForm title="Регистрация">
      <Input
        type="text"
        placeholder="Имя"
        onChange={onFormChange}
        value={name}
        name="name"
        icon="EditIcon"
        error={false}
        errorText=""
      />
      <Input
        type="text"
        placeholder="E-mail"
        onChange={onFormChange}
        value={email}
        name="email"
        icon="EditIcon"
        error={false}
        errorText=""
      />
      <Input
        type={passwordShown ? 'text' : 'password'}
        placeholder="Пароль"
        onChange={onFormChange}
        icon={passwordShown ? 'HideIcon' : 'ShowIcon'}
        value={password}
        name="password"
        error={false}
        onIconClick={() => { setPasswordShown(!passwordShown); }}
        errorText="Ошибка"
        size="default"
      />
      <Button type="primary" size="large" onClick={onFormSubmit}>
        Зарегистрироваться
      </Button>
      <LoginLink />
    </AuthForm>
  );
};
