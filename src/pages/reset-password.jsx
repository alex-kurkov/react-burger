import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setResetFormValue } from '../services/actions/form'; 
import { confirmPasswordReset } from '../services/actions/auth';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom';
import { AuthForm } from '../components/auth-form'

export const ResetPasswordPage = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const { password, code } = useSelector(state => state.form.reset);
  const dispatch = useDispatch();

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(confirmPasswordReset({ password, token: code }))
  }

  const onFormChange = (e) => {
    dispatch(setResetFormValue(e.target.name, e.target.value))
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
        type={passwordShown ? 'text' : 'password'}
        placeholder={'Введите новый пароль'}
        onChange={onFormChange}
        icon={passwordShown ? 'HideIcon' : 'ShowIcon'}
        value={password}
        name={'password'}
        error={false}
        onIconClick={() => { setPasswordShown(!passwordShown) }}
        errorText={'Ошибка'}
        size={'default'}
    />
      <Input
        type={'text'}
        placeholder={'Введите код из письма'}
        onChange={onFormChange}
        value={code}
        name={'code'}
        icon={'EditIcon'}
        error={false}
        errorText={''}
    />
      <Button type="primary" size="large" onClick={onFormSubmit}>
        Сохранить
      </Button>
      <LoginLink />
    </AuthForm>
)}
