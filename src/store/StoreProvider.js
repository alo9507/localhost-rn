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
import { initialState } from "./Reducer";

const StoreProvider = ({ children }) => {

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

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'UPDATE_USER':
          console.log("UPDATE_USER reducer called with: ", action.payload);
          return {
            ...prevState, user: action.payload
          };
        default:
          return prevState;
        // throw new Error('Unsupported action type: ', action.type);
      }
    },
    initialState
  );

  console.log("App State is: ", state);

  const loading = <Text>Loading...</Text>;
  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
