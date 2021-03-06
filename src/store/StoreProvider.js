import React, { useReducer } from "react";
import StoreContext from "./StoreContext";
import { initialState } from "./InitialState";

const StoreProvider = ({ children }) => {

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'OVERWRITE_USER':
          return {
            ...prevState, user: action.payload
          };
        case 'UPDATE_USER':
          const newState = {
            ...prevState, user: { ...prevState.user, ...action.payload }
          };
          return newState;
        case 'SET_MFA_SESSION':
          const mfaState = {
            ...prevState, session: action.payload.session, phoneNumber: action.payload.phoneNumber
          };
          return mfaState;
        case 'GLOBAL_DISPATCH':
          const dispatchState = {
            ...prevState, dispatch: action.payload
          };
          return dispatchState;
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
