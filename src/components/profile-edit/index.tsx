import { useState, FC, SyntheticEvent, FormEvent } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { modifyUser } from '../../services/actions/auth';
import styles from './styles.module.css';
import { TProfileInputs } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks';

export const ProfileEdit: FC = () => {
  const dispatch = useAppDispatch();
  const { name, email } = useAppSelector((state) => state.user);
  const [values, setValues] = useState({
    name,
    email,
    password: '',
  });
  const [disabled, setDisabled] = useState({
    name: true,
    email: true,
    password: true,
  });

  const onFormChange = (e: SyntheticEvent<HTMLInputElement>) => {
    let target = e.target as HTMLInputElement;
    const { name, value } = target;
    if (name && value ) setValues({ ...values, [name]: value });
  };

  const toggleInputDisability = (field: TProfileInputs) => {
    setDisabled({ ...disabled, [field]: !disabled[field] });
  };

  const resetForm = () => {
    setValues({
      name,
      email,
      password: '',
    });
    setDisabled({
      name: true,
      email: true,
      password: true,
    });
  };
  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const data: {
      name?: string, email?: string, password?: string
    } = {};
    if (values.name && values.name !== name) data.name = values.name;
    if (values.email && values.email !== email) data.email = values.email;
    if (values.password) data.password = values.password;
    dispatch(modifyUser(data));
  };

  return (
    <form onSubmit={onFormSubmit} className={styles.form}>
      <Input
        disabled={disabled.name}
        type="text"
        placeholder="Имя"
        onChange={onFormChange}
        icon="EditIcon"
        value={values.name}
        name="name"
        error={false}
        onIconClick={() => toggleInputDisability('name')}
        errorText="Ошибка"
        size="default"
        onBlur={() => toggleInputDisability('name')}
      />
      <Input
        disabled={disabled.email}
        type="text"
        placeholder="Логин"
        onChange={onFormChange}
        icon="EditIcon"
        value={values.email}
        name="email"
        error={false}
        onIconClick={() => toggleInputDisability('email')}
        errorText="Ошибка"
        size="default"
        onBlur={() => toggleInputDisability('email')}
      />
      <Input
        disabled={disabled.password}
        type="password"
        placeholder="Пароль"
        onChange={onFormChange}
        icon="EditIcon"
        value={values.password}
        name="password"
        error={false}
        onIconClick={() => toggleInputDisability('password')}
        errorText="Ошибка"
        size="default"
        onBlur={() => toggleInputDisability('password')}
      />
      <div className={styles.buttonsWrap}>
        <Button type="secondary" size="large" onClick={resetForm}>
          Отмена
        </Button>
        <Button type="primary" size="large" >Сохранить</Button>
      </div>
    </form>
  );
};
