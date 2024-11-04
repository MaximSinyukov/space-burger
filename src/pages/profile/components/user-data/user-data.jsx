import React from 'react';

import userDataStyle from './user-data.module.css';

import UniversalForm from 'components/universal-form/universal-form';

function UserData() {
  const [nameValue, setNameValue] = React.useState('');
  const [emailValue, setEmailValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');

  const onNameChange = e => {
    setNameValue(e.target.value)
  };

  const onEmailChange = e => {
    setEmailValue(e.target.value)
  };

  const onPasswordChange = e => {
    setPasswordValue(e.target.value)
  };

  const formData = {
    inputsData: [
      {
        type: 'default',
        props: {
          value: nameValue,
          onChange: onNameChange,
          placeholder: 'Имя',
          icon: 'EditIcon',
          extraClass: 'mb-6',
        },
      },
      {
        type: 'email',
        props: {
          value: emailValue,
          onChange: onEmailChange,
          placeholder: 'Логин',
          isIcon: true,
          extraClass: 'mb-6',
        },
      },
      {
        type: 'password',
        props: {
          value: passwordValue,
          onChange: onPasswordChange,
          placeholder: 'Пароль',
          icon: 'EditIcon',
        },
      },
    ],
  };

  return (
    <div className={`${userDataStyle['user-data']}`}>
      {
        formData &&
          <UniversalForm
          { ...formData }/>
      }
    </div>
  );
}

export default UserData;
