import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import profileStyle from './profile.module.css';

import UniversalForm from 'components/universal-form/universal-form';

function Profile() {
  const [nameValue, setNameValue] = React.useState('');
  const [emailValue, setEmailValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');

  const location = useLocation();

  const onNameChange = e => {
    setNameValue(e.target.value)
  };

  const onEmailChange = e => {
    setEmailValue(e.target.value)
  };

  const onPasswordChange = e => {
    setPasswordValue(e.target.value)
  };

  const profileNavigationData = [
    {
      text: 'Профиль',
      route: '/profile',
      onClick: 'click',
    },
    {
      text: 'История заказов',
      route: '/orders',
      onClick: 'click',
    },
    {
      text: 'Выход',
      onClick: 'click',
    },
  ];

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
    <section
    className={`${profileStyle['profile']}`}>
      <nav
      className={`mr-15 ${profileStyle['profile__navigation']}`}>
        {
          profileNavigationData.map((link, index) => (
            <Link
            key={'profile-navigation-' + index}
            to={link.route}
            className={`text text_type_main-medium ${profileStyle['profile__nav-link']} ${
              location.pathname === link.route
                ? profileStyle['profile__nav-link_active']
                : ''
            }`}>
              { link.text }
            </Link>
          ))
        }

        <p
        className={`mt-20 text text_type_main-default ${profileStyle['profile__advice']}`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>

      {
        formData &&
          <UniversalForm
          { ...formData }/>
      }
    </section>
  );
}

export default Profile;
