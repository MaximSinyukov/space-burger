import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function ProtectedRouteElement({ element, type }) {
  const location = useLocation();

  const isAuthorizedUser = useSelector(store => store.user.isAuthorized);

  if (type === 'anonymous') {
    return isAuthorizedUser
      ? (<Navigate to="/" replace/>)
      : (element);
  }

  return isAuthorizedUser
    ? element
    : (<Navigate to="/login" state={{ from: location}}/>);
};

ProtectedRouteElement.propTypes = {
  element: PropTypes.node.isRequired,
  type: PropTypes.string,
};

export default ProtectedRouteElement;
