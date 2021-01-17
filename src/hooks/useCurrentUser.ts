import { useContext } from 'react';
import StoreContext from '../store/StoreContext';
import User from '../models/User';

const useCurrentUser = (): [User, (any) => void] => {
  const [appState, setAppState] = useContext(StoreContext);
  const currentUser = appState.user;

  const updateCurrentUser = (payload) => {
    setAppState({ type: 'UPDATE_USER', payload });
  };

  return [currentUser, updateCurrentUser];
};

export default useCurrentUser;
