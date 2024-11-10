import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function ProtectedRouteElement({ element, type }) {
  const location = useLocation();
  const from = location.state?.from || '/';

  const isAuthorizedUser = useSelector(store => store.user.isAuthorized);

  if (type === 'anonymous' && isAuthorizedUser) {
    return <Navigate to={from} replace/>;
  }

  if (type !== 'anonymous' && !isAuthorizedUser) {
    return <Navigate to="/login" state={{ from: location}}/>;
  }

  return element;
};

ProtectedRouteElement.propTypes = {
  element: PropTypes.node.isRequired,
  type: PropTypes.string,
};

export default ProtectedRouteElement;
