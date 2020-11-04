import React from 'react';
import UserRepository from '../service/user-repository/UserRepository';

type StoreContextState = {
    userRepository: UserRepository;
};

const StoreContext: StoreContextState = React.createContext();

export default StoreContext;
