import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import appHeaderStyles from './app-header.module.css';

import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

function AppHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  const renderComponents = [
    {
      text: 'Конструктор',
      icon: BurgerIcon,
      id: 'burger',
      path: '/',
      handler: () => {
        navigate('');
      },
    },
    {
      text: 'Лента заказов',
      icon: ListIcon,
      id: 'orders',
    },
    {
      text: 'Личный кабинет',
      icon: ProfileIcon,
      id: 'account',
      path: '/profile',
      handler: () => {
        navigate('/profile');
      },
    },
  ];

  const headerBtnsHandler = (btn) => {
    if (btn.handler) {
      btn.handler();
    }
  };

  return (
    <header
    className={`${appHeaderStyles['app-header']} pt-4 pb-4`}>
      <nav
      className={appHeaderStyles['app-header__navigation']}>
        {
          renderComponents.map((btn) => (
            <button
            onClick={() => {headerBtnsHandler(btn)}}
            key={btn.id}
            className={`mr-2 pr-5 pl-5 ${appHeaderStyles['app-header__btn']}`}>
              {
                React.createElement(btn.icon, {
                  type: (location.pathname.includes(btn.path) && btn.path !== '/')
                    || (location.pathname === '/' && btn.path === '/')
                      ? 'primary'
                      : 'secondary',
                  className: `mr-2 ${appHeaderStyles['app-header__btn-icon']}`
                })
              }

              <span
              className={`text text_type_main-default ${appHeaderStyles['app-header__btn-text']} ${
                (location.pathname.includes(btn.path) && btn.path !== '/')
                  || (location.pathname === '/' && btn.path === '/')
                    ? appHeaderStyles['app-header__btn-text--active']
                    : ''
              }`}>
                { btn.text }
              </span>
            </button>
          ))
        }
      </nav>

      <Logo
      className={appHeaderStyles['app-header__logo']}/>
    </header>
  );
}

export default AppHeader;
