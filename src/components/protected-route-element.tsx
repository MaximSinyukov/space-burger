import { Navigate, useLocation } from 'react-router-dom';

import { useAppSelector } from 'src/index';

type TProtectedRouteProps = {
  element: React.ReactNode;
  type?: string | undefined;
};

function ProtectedRouteElement({ element, type }: TProtectedRouteProps) {
  const location = useLocation();
  const from: string = location.state?.from || '/';

  const isAuthorizedUser = useAppSelector((store) => store.user.isAuthorized);

  if (type === 'anonymous' && isAuthorizedUser) {
    return <Navigate to={from} replace/>;
  }

  if (type !== 'anonymous' && !isAuthorizedUser) {
    return <Navigate to="/login" state={{ from: location}}/>;
  }

  return <>{element}</>;
};

export default ProtectedRouteElement;
