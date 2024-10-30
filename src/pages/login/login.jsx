import React from 'react';

import loginStyle from './login.module.css';

import UniversalForm from 'components/universal-form/universal-form';

function Login() {
  const [emailValue, setEmailValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');

  const onEmailChange = e => {
    setEmailValue(e.target.value)
  };

  const onPasswordChange = e => {
    setPasswordValue(e.target.value)
  };

  const formData = {
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
