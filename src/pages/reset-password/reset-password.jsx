import React from 'react';
import { useNavigate } from "react-router-dom";

import resetPasswordStyle from './reset-password.module.css';

import UniversalForm from 'components/universal-form/universal-form';

import { request } from 'utils/methods/request';

function ResetPassword() {
  const navigate = useNavigate();
  const [newPasswordValue, setNewPasswordValue] = React.useState('');
  const [emailCodeValue, setEmailCodeValue] = React.useState('');

  const onNewPasswordValue = e => {
    setNewPasswordValue(e.target.value)
  };

  const onEmailCodeValue = e => {
    setEmailCodeValue(e.target.value)
  };

  const handleResetPassword = async () => {
    const response = await request('/password-reset/reset', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: newPasswordValue,
        token: emailCodeValue,
      }),
    });

    if (!response.success) {
      console.error('Error in reset-password method');
      return;
    }

    navigate('/login'); ;
  };

  const formData = {
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
