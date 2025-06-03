import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = ({ children }) => {
  const userInfo = useSelector((state) => state.user.userInfo);

  const isAdmin = userInfo?.token && userInfo?.role === 'Admin';

  return isAdmin ? children : <Navigate to="/unauthorized" replace />;
};

export default AdminRoute;
