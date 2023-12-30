import React from "react";
import { createContext, useContext } from "react";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  return <AppContext.Provider>{children}</AppContext.Provider>;
};

const useAppContext = () => useContext(AppContext);

export { useAppContext, AppContextProvider };
