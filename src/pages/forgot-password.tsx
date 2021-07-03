import { FC, SyntheticEvent } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation, Redirect } from 'react-router-dom';
import { setForgotFormValue } from '../services/reducers/form/formSlice';
import { resetPassword } from '../services/actions/auth';
import { AuthForm } from '../components/auth-form/index';
import { TLocationState } from '../types';
import { useAppDispatch, useAppSelector } from '../hooks';

export const ForgotPasswordPage: FC = () => {
  const { email } = useAppSelector((state) => state.form.forgot);
  const { passwordReset } = useAppSelector((state) => state.user);
  const { loggedIn } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const location = useLocation<TLocationState>();
  
  const { from } = location.state || { from: { pathname: '/' } };

  const onFormSubmit = () => dispatch(resetPassword({ email }));

  if (passwordReset) {
    return (
      <Redirect to={{
        pathname: '/reset-password',
        state: { from },
      }}
      />
    );
  }

  if (loggedIn) return (<Redirect to={from} />);

  const onFormChange = (e: SyntheticEvent) => {
    let target = e.target as HTMLInputElement;
    const { name, value } = target;
    dispatch(setForgotFormValue({ key: name, value }));
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
        type="text"
        placeholder="Укажите e-mail"
        onChange={onFormChange}
        value={email}
        name="email"
        icon="EditIcon"
        error={false}
        errorText=""
      />
      <Button type="primary" size="large">
        <span onClick={onFormSubmit}>Восстановить</span>
      </Button>
      <LoginLink />
    </AuthForm>
  );
};
