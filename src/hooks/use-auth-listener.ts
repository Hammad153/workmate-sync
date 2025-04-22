
import { useEffect } from 'react';
import { useAppDispatch } from './use-redux';
import { setUser } from '../store/slices/authSlice';

export const useAuthListener = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Simulate checking local storage for saved session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      dispatch(setUser(JSON.parse(savedUser)));
    }
  }, [dispatch]);
};
