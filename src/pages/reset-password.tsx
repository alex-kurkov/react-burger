import { useEffect, useState, FC, SyntheticEvent } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {
  Link, Redirect, useLocation, useHistory,
} from 'react-router-dom';
import { setResetFormValue } from '../services/reducers/form/formSlice';
import { confirmPasswordReset } from '../services/actions/auth';
import { AuthForm } from '../components/auth-form/index';
import { TLocationTemplate } from '../types';
import { useAppDispatch, useAppSelector } from '../hooks';

export const ResetPasswordPage: FC = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const { loggedIn, passwordReset, passwordResetSuccess } = useAppSelector((state)=> state.user);
  const { password, code } = useAppSelector((state) => state.form.reset);
  const dispatch = useAppDispatch();
  const location = useLocation<TLocationTemplate>();
  const history = useHistory();
  const { from } = location.state || { from: { pathname: '/' } };

  useEffect(() => {
    if (passwordResetSuccess) history.replace({ pathname: '/login' });
  }, [passwordResetSuccess, history]);

  if (loggedIn) {
    return (
      <Redirect to={from} />
    );
  }
  if (!passwordReset && !loggedIn) return (<Redirect to="/forgot-password" />);

  const onFormSubmit = () => dispatch(confirmPasswordReset({ password, token: code }));

  const onFormChange = (e: SyntheticEvent) => {
    let target = e.target as HTMLInputElement;
    const { name, value } = target;
    dispatch(setResetFormValue({ key: name, value }));
  };

  const LoginLink = () => (
    <p className="text text_type_main-default text_color_inactive mt-20">
      Вспомнили пароль?&ensp;
      <Link to="/login">Войти</Link>
    </p>
  );

  return (
    <AuthForm title="Восстановление пароля">
      <Input
        type={passwordShown ? 'text' : 'password'}
        placeholder="Введите новый пароль"
        onChange={onFormChange}
        icon={passwordShown ? 'HideIcon' : 'ShowIcon'}
        value={password}
        name="password"
        error={false}
        onIconClick={() => { setPasswordShown(!passwordShown); }}
        errorText="Ошибка"
        size="default"
      />
      <Input
        type="text"
        placeholder="Введите код из письма"
        onChange={onFormChange}
        value={code}
        name="code"
        icon="EditIcon"
        error={false}
        errorText=""
      />
      <div onClick={onFormSubmit}>
        <Button type="primary" size="large">
          Сохранить
        </Button>
      </div>
      <LoginLink />
    </AuthForm>
  );
};
