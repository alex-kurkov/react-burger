import { useSelector, useDispatch } from 'react-redux';
import { setForgotFormValue } from '../services/actions/form'; 
import { resetPassword } from '../services/actions/auth';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useHistory } from 'react-router-dom';
import { AuthForm } from '../components/auth-form'
import { useEffect } from 'react';
import { CLEAR_PASSWORD_RESET } from '../utils/constants';

export const ForgotPasswordPage = () => {
  const { email } = useSelector(state => state.form.forgot);
  const { passwordReset } = useSelector(state => state.user);
  const history = useHistory();
  const dispatch = useDispatch();

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword({email}))
  }
  useEffect(() => {
    if (!passwordReset) return;
    history.push('/reset-password');
    dispatch({ type: CLEAR_PASSWORD_RESET });
  }, [passwordReset, dispatch, history])

  const onFormChange = (e) => {
    dispatch(setForgotFormValue(e.target.name, e.target.value))
  }

  const LoginLink = () => (
    <p className="text text_type_main-default text_color_inactive mt-20">
      Вспомнили пароль?&ensp;
      <Link to='/login'>Войти</Link>
    </p>
  )

  return (
    <AuthForm title="Восстановление пароля">
      <Input
        type={'text'}
        placeholder={'Укажите e-mail'}
        onChange={onFormChange}
        value={email}
        name={'email'}
        icon={'EditIcon'}
        error={false}
        errorText={''}
    />
      <Button type="primary" size="large" onClick={onFormSubmit}>
        Восстановить
      </Button>
      <LoginLink />
    </AuthForm>
)}