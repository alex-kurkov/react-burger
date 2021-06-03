import { useState, useRef } from 'react';
import styles from './login.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom';

export const LoginPage = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [value, setValue] = useState({
    email: '',
    password: '',
  })
  const emailInputRef = useRef(null)
  const passwordInputRef = useRef(null)
  
  const RegisterLink = () => (
    <p className="text text_type_main-default text_color_inactive mb-4">
      Вы — новый пользователь?&ensp;
      <Link to='/register'>Зарегистрироваться</Link>
    </p>
  )
  const ResetLink = () => (
    <p className="text text_type_main-default text_color_inactive">
      Забыли пароль&ensp;
      <Link to='/reset-password'>Восстановить пароль</Link>
    </p>
  )

  return (
  <main className={styles.main}>
    <div className={`${styles.wrapper}`}>
      <h2 className={`${styles.heading} mb-6`}>Вход</h2>
      <form className={`${styles.form} mb-20`}>
        <Input
          type={'email'}
          placeholder={'E-mail'}
          onChange={() => {}}
          value={value.email}
          name={'email'}
          error={false}
          ref={emailInputRef}
          errorText={''}

      />
        <Input
          type={'password'}
          placeholder={'Пароль'}
          onChange={() => {}}
          icon={passwordShown ? 'HideIcon' : 'ShowIcon'}
          value={value}
          name={'password'}
          error={false}
          ref={passwordInputRef}
          onIconClick={() => { setPasswordShown(!passwordShown) }}
          errorText={'Ошибка'}
          size={'default'}
      />
        <Button type="primary" size="large">
          Войти
        </Button>
      </form>
      <RegisterLink />
      <ResetLink />

    </div>
  </main>
)}

