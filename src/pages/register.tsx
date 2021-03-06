import { useState, FC, SyntheticEvent } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { setRegisterFormValue } from '../services/reducers/form/formSlice';
import { register } from '../services/actions/auth';
import { AuthForm } from '../components/auth-form/index';
import { TLocationTemplate } from '../types';
import { useAppDispatch, useAppSelector } from '../hooks';

export const RegisterPage: FC = () => {
  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const { name, email, password } = useAppSelector((state) => state.form.register);
  const { loggedIn } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const location = useLocation<TLocationTemplate>();

  if (loggedIn) {
    const { from } = location.state || { from: { pathname: '/' } };
    return (
      <Redirect to={from} />
    );
  }

  const onFormSubmit = () => dispatch(register({ name, email, password }));

  const onFormChange = (e: SyntheticEvent) => {
    let target = e.target as HTMLInputElement;
    const { name, value } = target;
    dispatch(setRegisterFormValue({ key: name, value }));
  };

  const LoginLink = () => (
    <p className="text text_type_main-default text_color_inactive mt-20">
      Уже зарегистрированы?&ensp;
      <Link to="/login">Войти</Link>
    </p>
  );

  return (
    <AuthForm title="Регистрация" onSubmit={onFormSubmit}>
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
      <Button type="primary" size="large">
        Зарегистрироваться
      </Button>
      <LoginLink />
    </AuthForm>
  );
};
