import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import profileStyle from './profile.module.css';

import UserData from './components/user-data/user-data';
import { exitUser } from 'services/actions/userActions';

function Profile() {
  const location = useLocation();
  const dispatch = useDispatch();

  const handleExitUser = React.useCallback(
    () => {
      dispatch(exitUser('test'))
        .catch((err) => {
          console.warn(err, 'Error in handleExitUser method');
        });
    },
    [dispatch]
  );

  const profileNavigationControls = {
    '/profile': {
      text: 'Профиль',
      route: '/profile',
      component: <UserData/>,
    },
    '/profile/orders': {
      text: 'История заказов',
      route: '/profile/orders',
      component: <div>Скоро тут будут заказы...</div>,
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
              ) : (
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
