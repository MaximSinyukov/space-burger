import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import appHeaderStyles from './app-header.module.css';

import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { TIcon } from 'utils/constants/types';

type THeaderBtn = Readonly<{
  text: string,
  icon: TIcon,
  id: string,
  path?: string,
  handler?: () => void,
}>;

function AppHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  const renderBtns: THeaderBtn[] = [
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
      path: '/feed',
      handler: () => {
        navigate('/feed');
      },
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

  const headerBtnsHandler = (btn: THeaderBtn): void => {
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
          renderBtns.map((btn) => (
            <button
            onClick={() => {headerBtnsHandler(btn)}}
            key={btn.id}
            className={`mr-2 pr-5 pl-5 ${appHeaderStyles['app-header__btn']}`}>
              {
                React.createElement(btn.icon, {
                  type: (btn.path && location.pathname.includes(btn.path) && btn.path !== '/')
                    || (location.pathname === '/' && btn.path === '/')
                      ? 'primary'
                      : 'secondary',
                  className: `mr-2 ${appHeaderStyles['app-header__btn-icon']}`
                })
              }

              <span
              className={`text text_type_main-default ${appHeaderStyles['app-header__btn-text']} ${
                (btn.path && location.pathname.includes(btn.path) && btn.path !== '/')
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
