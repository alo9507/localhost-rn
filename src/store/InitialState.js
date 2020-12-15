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

import FirstLaunchService from "../service/first-launch-service/FirstLaunchService";
import MockFirstLaunchService from "../service/first-launch-service/MockFirstLauncService";
import AsyncStorageFirstLaunchService from "../service/first-launch-service/AsyncStorageFirstLaunchService";

import AppState from "../models/AppState";

let initialState;

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
    longitude: 23.125367053780863,
    profileImageUrl: "https://randomuser.me/portraits/men/55.jpg"
};

switch (env.environment) {
    case "development":
        initialState = {
            userRepository: new GraphQLUserRepository(),
            authManager: new EZAuthManager(),
            firstLaunchService: new AsyncStorageFirstLaunchService(),
            user: user,
            goToMain: true
        };
        break;
    case "production":
        initialState = {
            userRepository: new GraphQLUserRepository(),
            authManager: new EZAuthManager(),
            firstLaunchService: new AsyncStorageFirstLaunchService(),
            user: null
        };
        break;
    case "local":
        initialState = {
            userRepository: new MockUserRepository(),
            authManager: new MockAuthManager(),
            firstLaunchService: new MockFirstLaunchService(env.alwaysFirstLaunch),
            user: null
        };
        break;
    default:
        throw Error("ENVIRONMENT NOT CONFIGURED CORRECTLY");
}

export { initialState };