import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import loginStyle from './login.module.css';

import UniversalForm from 'src/components/universal-form/universal-form';

import { loginUser } from 'src/services/actions/userActions';

import { useAppDispatch } from 'src/index';
import {
  TUniversalFormData,
} from 'utils/constants/types';

function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [emailValue, setEmailValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmailValue(e.target.value)
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPasswordValue(e.target.value)
  };

  const handleLoginUser = React.useCallback(
    (): void => {
      dispatch(loginUser({
        email: emailValue,
        password: passwordValue,
      }))
        .then((res) => {
          if (res.type.endsWith('/fulfilled')) {
            navigate(location?.state?.from.pathname || '/');
          }
        })
        .catch((err) => {
          console.warn(err, 'Error in handleLoginUser method');
        });
    },
    [dispatch, emailValue, location?.state?.from.pathname, navigate, passwordValue]
  );

  const formData: TUniversalFormData = {
    submitHandler: handleLoginUser,
    textData: {
      title: 'Вход',
      btn: 'Войти',
    },
    inputsData: [
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
        baseText: 'Вы — новый пользователь?',
        linkText: 'Зарегистрироваться',
        route: '/register'
      },
      {
        baseText: 'Забыли пароль?',
        linkText: 'Восстановить пароль',
        route: '/forgot-password'
      },
    ],
  };

  return (
    <section
    className={`${loginStyle['login']}`}>
      {
        formData &&
          <UniversalForm
          { ...formData }/>
      }
    </section>
  );
}

export default Login;
