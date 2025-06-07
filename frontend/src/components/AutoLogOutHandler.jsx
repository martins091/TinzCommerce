// src/components/AutoLogoutHandler.jsx
import useAutoLogout from '../hooks/userAutoLogout';

const AutoLogoutHandler = () => {
  useAutoLogout();
  return null; // This component doesn't render anything visible
};

export default AutoLogoutHandler;
