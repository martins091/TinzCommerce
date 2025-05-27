import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const userInfo = useSelector((state) => state.user.userInfo); // ✅ correct key

  return userInfo && userInfo.token ? children : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
