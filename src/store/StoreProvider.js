import { graphQLResultHasError } from "@apollo/client/utilities";
import React, { useState } from "react";
import StoreContext from "./StoreContext";
import UserRepository from "../service/user-repository/UserRepository";
import GraphQLUserRepository from "../service/user-repository/GraphQLUserRepository";
import MockUserRepository from "../service/user-repository/MockUserRepository";
import AuthManager from "../service/authentication/AuthManager/AuthManager";
import EZAuthManager from "../service/authentication/AuthManager/EZAuthManager";
import MockAuthManager from "../service/authentication/AuthManager/MockAuthManager";
const env = require("../../env.json");

const StoreProvider = ({ children }) => {
  let userRepository: UserRepository;
  let authManager: AuthManager;

  switch (env.environment) {
    case "development":
      userRepository = new GraphQLUserRepository();
      authManager = new EZAuthManager();
      break;
    case "production":
      userRepository = new GraphQLUserRepository();
      authManager = new EZAuthManager();
      break;
    case "local":
      userRepository = new MockUserRepository();
      authManager = new MockAuthManager();
      break;
    default:
      throw Error("ENVIRONMENT NOT CONFIGURED CORRECTLY");
  }

  type AppState = {
    userRepository: UserRepository;
    authManager: AuthManager;
  };

  const initialState: AppState = {
    userRepository,
    authManager
  };

  const [state, setState] = useState(initialState);

  return (
    <StoreContext.Provider value={[state, setState]}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
