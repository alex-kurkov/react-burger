import { useState, FC, SyntheticEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { setLoginFormValue } from '../services/reducers/form/formSlice';
import { login } from '../services/actions/auth';
import { AuthForm } from '../components/auth-form/index';
import { IStore, TLocationState } from '../types';

export const LoginPage: FC = () => {
  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const { email, password } = useSelector((state: IStore) => state.form.login);
  const { loggedIn } = useSelector((state: IStore) => state.user);
  const dispatch = useDispatch();
  const location = useLocation<TLocationState>();

  if (loggedIn) {
    const { from } = location.state || { from: { pathname: '/' } };
    return (
      <Redirect to={from} />
    );
  }

  const onFormSubmit = () => dispatch(login({ email, password }));

  const onFormChange = (e: SyntheticEvent) => {
    let target = e.target as HTMLInputElement;
    const { name, value } = target;
    dispatch(setLoginFormValue({ key: name, value }));
  };

  const RegisterLink = () => (
    <p className="text text_type_main-default text_color_inactive mt-20">
      Вы&ensp;— новый пользователь?&ensp;
      <Link to="/register">Зарегистрироваться</Link>
    </p>
  );
  const ResetLink = () => (
    <p className="text text_type_main-default text_color_inactive">
      Забыли пароль?&ensp;
      <Link to="/forgot-password">Восстановить пароль</Link>
    </p>
  );

  return (
    <AuthForm title="Вход">
      <Input
        type="text"
        placeholder="E-mail"
        onChange={onFormChange}
        value={email}
        icon="EditIcon"
        name="email"
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
        <span onClick={onFormSubmit}>Войти</span>
      </Button>
      <RegisterLink />
      <ResetLink />
    </AuthForm>
  );
};
