import { Link, useLocation } from 'react-router-dom';

import profileStyle from './profile.module.css';

import UserData from './components/user-data/user-data';

function Profile() {
  const location = useLocation();

  const profileNavigationData = {
    '/profile': {
      text: 'Профиль',
      route: '/profile',
      onClick: 'click',
      component: <UserData/>,
    },
    '/profile/orders': {
      text: 'История заказов',
      route: '/profile/orders',
      onClick: 'click',
      component: <div>Скоро тут будут заказы...</div>,
    },
    exit: {
      text: 'Выход',
      onClick: 'click',
    },
  };

  return (
    <section
    className={`${profileStyle['profile']}`}>
      <nav
      className={`mr-15 ${profileStyle['profile__navigation']}`}>
        {
          Object.values(profileNavigationData).map((link, index) => (
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
          profileNavigationData[location.pathname].component
        }
    </section>
  );
}

export default Profile;
