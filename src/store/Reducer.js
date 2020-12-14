import React, { useEffect, useState, useReducer } from "react";
const env = require("../../env.json");
import { graphQLResultHasError } from "@apollo/client/utilities";
import StoreContext from "./StoreContext";
import UserRepository from "../service/user-repository/UserRepository";
import GraphQLUserRepository from "../service/user-repository/GraphQLUserRepository";
import MockUserRepository from "../service/user-repository/MockUserRepository";
import AuthManager from "../service/authentication/AuthManager/AuthManager";
import EZAuthManager from "../service/authentication/AuthManager/EZAuthManager";
import MockAuthManager from "../service/authentication/AuthManager/MockAuthManager";
import AppState from "../models/AppState";

let initialState;

switch (env.environment) {
    case "development":
        console.log("dev called");
        initialState = {
            userRepository: new GraphQLUserRepository(),
            authManager: new EZAuthManager(),
            user: null,
            goToMain: false
        };
        break;
    case "production":
        initialState = {
            userRepository: new GraphQLUserRepository(),
            authManager: new EZAuthManager(),
            user: null
        };
        break;
    case "local":
        initialState = {
            userRepository: new MockUserRepository(),
            authManager: new MockAuthManager(),
            user: null
        };
        break;
    default:
        throw Error("ENVIRONMENT NOT CONFIGURED CORRECTLY");
}

export { initialState };