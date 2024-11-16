import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import forgotPasswordStyle from './forgot-password.module.css';

import UniversalForm from 'src/components/universal-form/universal-form';

import { request } from 'utils/methods/request';

import {
  TUniversalFormData,
} from 'utils/constants/types';

function ForgotPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const [forgotPasswordEmail, setForgotPasswordEmail] = React.useState<string>('');

  const onForgotPasswordEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setForgotPasswordEmail(e.target.value)
  };

  const handleForgotPassword = async () => {
    await request('/password-reset', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: forgotPasswordEmail,
      }),
    })
      .then(() => {
        navigate('/reset-password', {
          state: {
            from: location.pathname,
            message: forgotPasswordEmail
              ? 'emailAdded'
              : '',
          },
        });

        return Promise.resolve();
      })
      .catch((res) => {
        console.error(`Ошибка в handleForgotPassword: ${res}`)

        return Promise.reject();
      });
  };

  const formData: TUniversalFormData = {
    submitHandler: handleForgotPassword,
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
