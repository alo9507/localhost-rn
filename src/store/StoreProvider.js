import { graphQLResultHasError } from "@apollo/client/utilities";
import React, { useState } from "react";
import StoreContext from "./StoreContext";
import UserRepository from "../service/user-repository/UserRepository";
import GraphQLUserRepository from "../service/user-repository/GraphQLUserRepository";
import MockUserRepository from "../service/user-repository/MockUserRepository";
import AuthManager from "../service/authentication/AuthManager/AuthManager";
import EZAuthManager from "../service/authentication/AuthManager/EZAuthManager";
import MockAuthManager from "../service/authentication/AuthManager/MockAuthManager";
import AppState from "../models/AppState";
const env = require("../../env.json");

const StoreProvider = ({ children }) => {
  let initialState: AppState;

  const user = {
    id: "433b6860-51a1-411a-ad43-ad74035541a3",
    name: "George",
    bio: "George's bio",
    whatAmIDoing: "What George is doing",
    isVisible: true,
    showMeCriteria: {
      age: [
        18,
        100
      ],
      sex: [
        "male",
        "female"
      ]
    },
    age: 25,
    sex: "male",
    latitude: 24.22244098031902,
    longitude: 23.125367053780863
  };

  switch (env.environment) {
    case "development":
      initialState = {
        userRepository: new GraphQLUserRepository(),
        authManager: new EZAuthManager(),
        user,
        goToMain: true
      };
      break;
    case "production":
      initialState = {
        userRepository: new GraphQLUserRepository(),
        authManager: new EZAuthManager()
      };
      break;
    case "local":
      initialState = {
        userRepository: new MockUserRepository(),
        authManager: new MockAuthManager()
      };
      break;
    default:
      throw Error("ENVIRONMENT NOT CONFIGURED CORRECTLY");
  }

  const [state, staleUpdateState] = useState(initialState);

  const setState = (obj) => {
    staleUpdateState(state => ({ ...obj }));
  };

  return (
    <StoreContext.Provider value={[state, setState]}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
