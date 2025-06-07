import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getUserInfoFromStorage, removeUserInfoFromStorage } from '../utils/localStorage';
import { logoutUser } from '../features/user/userSlice';

const useAutoLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = getUserInfoFromStorage();
    const expiresAt = Number(userInfo?.expiresAt);

    if (userInfo && !isNaN(expiresAt)) {
      const now = Date.now();
      const timeout = expiresAt - now;

      if (timeout <= 0) {
        dispatch(logoutUser());
        removeUserInfoFromStorage();
        navigate('/signin');
      } else {
        const timer = setTimeout(() => {
          dispatch(logoutUser());
          removeUserInfoFromStorage();
          navigate('/signin');
        }, timeout);

        return () => clearTimeout(timer);
      }
    }
  }, [dispatch, navigate]);
};

export default useAutoLogout;
