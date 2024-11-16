import React from 'react';
import { useLocation, useNavigate, Navigate } from "react-router-dom";

import resetPasswordStyle from './reset-password.module.css';

import UniversalForm from 'src/components/universal-form/universal-form';

import { request } from 'utils/methods/request';

import {
  TUniversalFormData,
} from 'utils/constants/types';

function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const [newPasswordValue, setNewPasswordValue] = React.useState<string>('');
  const [emailCodeValue, setEmailCodeValue] = React.useState<string>('');

  const onNewPasswordValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewPasswordValue(e.target.value)
  };

  const onEmailCodeValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmailCodeValue(e.target.value)
  };

  const handleResetPassword = async (): Promise<void> => {
    await request('/password-reset/reset', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: newPasswordValue,
        token: emailCodeValue,
      }),
    })
      .then(() => {
        navigate('/login');

        return Promise.resolve();
      })
      .catch((res) => {
        console.error(`Ошибка в handleResetPassword: ${res}`)

        return Promise.reject();
      });
  };

  const formData: TUniversalFormData = {
    submitHandler: handleResetPassword,
    textData: {
      title: 'Восстановление пароля',
      btn: 'Сохранить',
    },
    inputsData: [
      {
        type: 'password',
        props: {
          value: newPasswordValue,
          onChange: onNewPasswordValue,
          placeholder: 'Введите новый пароль',
          icon: 'ShowIcon',
          extraClass: 'mb-6',
        },
      },
      {
        type: 'default',
        props: {
          value: emailCodeValue,
          onChange: onEmailCodeValue,
          placeholder: 'Введите код из письма',
        },
      },
    ],
    linksData: [
      {
        baseText: 'Вспомнили пароль?',
        linkText: 'Войти',
        route: '/login'
      },
    ],
  };

  if (location.state?.from !== '/forgot-password' || location.state?.message !== 'emailAdded') {
    return <Navigate to="/forgot-password" replace />;
  }

  return (
    <section
    className={`${resetPasswordStyle['reset-password']}`}>
      {
        formData &&
          <UniversalForm
          { ...formData }/>
      }
    </section>
  );
}

export default ResetPassword;
