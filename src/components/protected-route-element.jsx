import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRouteElement({ element, type }) {
  const isAuthorizedUser = useSelector(store => store.user.isAuthorized);

  if (type === 'anonymous') {
    return isAuthorizedUser
      ? (<Navigate to="/" replace/>)
      : (element);
  }

  return isAuthorizedUser
    ? element
    : (<Navigate to="/login" replace/>);
}

export default ProtectedRouteElement;
