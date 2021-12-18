import { onAuthStateChanged } from "@firebase/auth";
import { projectAuth } from "../firebase/config";
import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, userName: action.payload };
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: action.payload };
    case "AUTH_IS_READY":
      return { ...state, user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

export function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, {
    userName: "this user",
    user: null,
    authIsReady: false,
  });
  useEffect(() => {
    const unsub = onAuthStateChanged(projectAuth, (user) => {
      dispatch({ type: "AUTH_IS_READY", payload: user });
    });
    unsub();
  }, []);

  const setUserName = (userName) => {
    dispatch({ type: "SET_USER", payload: userName });
  };

  return (
    <AuthContext.Provider value={{ ...state, setUserName, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
