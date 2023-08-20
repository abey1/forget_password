import React, { useReducer, createContext } from "react";
import { useContext } from "react";
import { SIGNUP, LOGIN, LOGOUT } from "../utilities/constants";

export const UserContext = createContext();

const initialState = {
  email: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case SIGNUP: {
      return { ...state, email: action.payload };
    }
    case LOGIN: {
      return { ...state, email: action.payload };
    }
    case LOGOUT: {
      localStorage.removeItem("token");
      return { ...state, email: "" };
    }
    default: {
      return state;
    }
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, userDispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ ...state, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
