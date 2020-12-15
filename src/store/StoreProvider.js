import { graphQLResultHasError } from "@apollo/client/utilities";
import React, { useEffect, useState, useReducer } from "react";
import StoreContext from "./StoreContext";
import UserRepository from "../service/user-repository/UserRepository";
import GraphQLUserRepository from "../service/user-repository/GraphQLUserRepository";
import MockUserRepository from "../service/user-repository/MockUserRepository";
import AuthManager from "../service/authentication/AuthManager/AuthManager";
import EZAuthManager from "../service/authentication/AuthManager/EZAuthManager";
import MockAuthManager from "../service/authentication/AuthManager/MockAuthManager";
import AppState from "../models/AppState";
import { Text } from "react-native";
const env = require("../../env.json");
import { initialState } from "./InitialState";

const StoreProvider = ({ children }) => {

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'UPDATE_USER':
          return {
            ...prevState, user: action.payload
          };
        default:
          throw new Error('Unsupported action type: ', action.type);
      }
    },
    initialState
  );

  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
