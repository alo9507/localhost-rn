import { graphQLResultHasError } from "@apollo/client/utilities";
import React, { useState } from "react";
import StoreContext from "./StoreContext";
import UserRepository from "../service/user-repository/UserRepository";
import GraphQLUserRepository from "../service/user-repository/GraphQLUserRepository";

const StoreProvider = ({ children }) => {
  const userRepository: UserRepository = new GraphQLUserRepository();

  type AppState = {
    userRepository: UserRepository;
  };

  const initialState: AppState = {
    userRepository
  };

  const [state, setState] = useState(initialState);

  return (
    <StoreContext.Provider value={[state, setState]}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
