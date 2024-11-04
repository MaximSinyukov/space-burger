import React from 'react';
import { useNavigate } from "react-router-dom";

import forgotPasswordStyle from './forgot-password.module.css';

import UniversalForm from 'components/universal-form/universal-form';

import { request } from 'utils/methods/request';

function ForgotPassword() {
  const navigate = useNavigate();

  const [forgotPasswordEmail, setForgotPasswordEmail] = React.useState('');

  const onForgotPasswordEmailChange = e => {
    setForgotPasswordEmail(e.target.value)
  };

  const handleForgotPassword = async () => {
    const response = await request('/password-reset', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: forgotPasswordEmail,
      }),
    });

    if (!response.success) {
      console.error('Error in forgot-password method');
      return;
    }

    navigate('/reset-password'); ;
  };

  const formData = {
    btnHandler: handleForgotPassword,
    textData: {
      title: 'Восстановление пароля',
      btn: 'Восстановить',
    },
    inputsData: [
      {
        type: 'email',
        props: {
          value: forgotPasswordEmail,
          onChange: onForgotPasswordEmailChange,
          placeholder: 'Укажите e-mail',
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
    className={`${forgotPasswordStyle['forgot-password']}`}>
      {
        formData &&
          <UniversalForm
          { ...formData }/>
      }
    </section>
  );
}

export default ForgotPassword;
