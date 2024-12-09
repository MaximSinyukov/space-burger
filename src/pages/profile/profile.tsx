import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import profileStyle from './profile.module.css';

import UserData from './components/user-data/user-data';
import UserOrders from './components/user-orders/user-orders';
import { exitUser } from 'src/services/actions/userActions';

import { useAppDispatch } from 'src/index';

type TProfileNavigationControls = {
  [route: string]: {
    text: string;
    type?: 'btn' | undefined;
    route?: string;
    component?: React.ReactNode;
    onClick?: () => void;
  }
};

function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const handleExitUser = React.useCallback(
    (): void => {
      dispatch(exitUser())
        .then(() => {
          navigate('/login');
        })
        .catch((err = {}) => {
          console.warn(err, 'Error in handleExitUser method');
        });
    },
    [dispatch, navigate]
  );

  const profileNavigationControls: Readonly<TProfileNavigationControls> = {
    '/profile': {
      text: 'Профиль',
      route: '/profile',
      component: <UserData/>,
    },
    '/profile/orders': {
      text: 'История заказов',
      route: '/profile/orders',
      component: <UserOrders/>,
    },
    exit: {
      type: 'btn',
      text: 'Выход',
      onClick: () => {
        handleExitUser();
      },
    },
  };

  return (
    <section
    className={`${profileStyle['profile']}`}>
      <nav
      className={`mr-15 ${profileStyle['profile__navigation']}`}>
        {
          Object.values(profileNavigationControls).map((control, index) =>
            control.type === 'btn'
              ? (
                <span
                onClick={control.onClick}
                key={'profile-navigation-' + index}
                className={`text text_type_main-medium ${profileStyle['profile__nav-controls']}`}>
                  { control.text }
                </span>
              ) : (control.route &&
                <Link
                key={'profile-navigation-' + index}
                to={control.route}
                className={`text text_type_main-medium ${profileStyle['profile__nav-controls']} ${
                  location.pathname === control.route
                    ? profileStyle['profile__nav-link_active']
                    : ''
                }`}>
                  { control.text }
                </Link>
              )
          )
        }

        <p
        className={`mt-20 text text_type_main-default ${profileStyle['profile__advice']}`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>

        {
          profileNavigationControls[location.pathname].component
        }
    </section>
  );
}

export default Profile;
