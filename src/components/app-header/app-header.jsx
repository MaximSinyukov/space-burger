import React from 'react';
import appHeaderStyles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

function AppHeader() {
  const renderComponents = [
    {
      text: 'Конструктор',
      icon: BurgerIcon,
      id: 'burger',
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
    },
  ];

  return (
    <header
    className={`${appHeaderStyles['app-header']} pt-4 pb-4`}>
      <nav
      className={appHeaderStyles['app-header__navigation']}>
        {
          renderComponents.map((btn) => (
            <button
            key={btn.id}
            className={`mr-2 pr-5 pl-5 ${appHeaderStyles['app-header__btn']}`}>
              {
                React.createElement(btn.icon, {
                  type: btn.id === 'burger'
                    ? 'primary'
                    : 'secondary',
                  className: `mr-2 ${appHeaderStyles['app-header__btn-icon']}`
                })
              }

              <span
              className={`text text_type_main-default ${appHeaderStyles['app-header__btn-text']} ${
                btn.id === 'burger'
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
