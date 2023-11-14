import React, { useState, createContext } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {return false});
  const [loading, setLoading] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated, setIsAuthenticated,
        loading, setLoading
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};