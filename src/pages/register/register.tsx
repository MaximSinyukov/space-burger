import React from 'react';
import { useNavigate } from "react-router-dom";

import registerStyle from './register.module.css';

import UniversalForm from 'src/components/universal-form/universal-form';

import { registerUser } from 'services/actions/userActions';

import { useAppDispatch } from 'src/index';
import {
  TUniversalFormData,
} from 'utils/constants/types';

function Register() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [nameValue, setNameValue] = React.useState('');
  const [emailValue, setEmailValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNameValue(e.target.value)
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmailValue(e.target.value)
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPasswordValue(e.target.value)
  };

  const handleRegisterUser = React.useCallback(
    () => {
      // @ts-ignore TODO: fix after add types in redux
      dispatch(registerUser({
        email: emailValue,
        password: passwordValue,
        name: nameValue,
      }))
        .then((res) => {
          if (res.type.endsWith('/fulfilled')) {
            navigate('/');
          }
        })
        .catch((err) => {
          console.warn(err, 'Error in handleRegisterUser method');
        });
    },
    [dispatch, emailValue, nameValue, navigate, passwordValue]
  );

  const formData: TUniversalFormData = {
    submitHandler: handleRegisterUser,
    textData: {
      title: 'Регистрация',
      btn: 'Зарегистрироваться',
    },
    inputsData: [
      {
        type: 'default',
        props: {
          value: nameValue,
          onChange: onNameChange,
          placeholder: 'Имя',
          extraClass: 'mb-6',
        },
      },
      {
        type: 'email',
        props: {
          value: emailValue,
          onChange: onEmailChange,
          placeholder: 'E-mail',
          extraClass: 'mb-6',
        },
      },
      {
        type: 'password',
        props: {
          value: passwordValue,
          onChange: onPasswordChange,
          placeholder: 'Пароль',
          icon: 'ShowIcon',
        },
      },
    ],
    linksData: [
      {
        baseText: 'Уже зарегистрированы?',
        linkText: 'Войти',
        route: '/login'
      },
    ],
  };

  return (
    <section
    className={`${registerStyle['register']}`}>
      {
        formData &&
          <UniversalForm
          { ...formData }/>
      }
    </section>
  );
}

export default Register;
