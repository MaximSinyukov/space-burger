import React from 'react';

import forgotPasswordStyle from './forgot-password.module.css';

import UniversalForm from 'components/universal-form/universal-form';

function ForgotPassword() {
  const [forgotPasswordEmail, setForgotPasswordEmail] = React.useState('');

  const onForgotPasswordEmailChange = e => {
    setForgotPasswordEmail(e.target.value)
  };

  const formData = {
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
