import React from 'react';

import resetPasswordStyle from './reset-password.module.css';

import UniversalForm from 'components/universal-form/universal-form';

function ResetPassword() {
  const [newPasswordValue, setNewPasswordValue] = React.useState('');
  const [emailCodeValue, setEmailCodeValue] = React.useState('');

  const onNewPasswordValue = e => {
    setNewPasswordValue(e.target.value)
  };

  const onEmailCodeValue = e => {
    setEmailCodeValue(e.target.value)
  };

  const formData = {
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
          extraClass: 'mt-6',
        },
      },
      {
        type: 'email',
        props: {
          value: emailCodeValue,
          onChange: onEmailCodeValue,
          placeholder: 'Введите код из письма',
          extraClass: 'mt-6',
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
