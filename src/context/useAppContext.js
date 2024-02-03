import React, { useEffect, useState } from "react";
import { createContext, useContext } from "react";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const handleWindowResize = () => {
    const windowWidth = window.outerWidth;

    setIsMobile(windowWidth < 768);
    setIsTablet(windowWidth >= 768 && windowWidth <= 1024);
    setIsDesktop(windowWidth > 1024);
  };

  useEffect(() => {
    handleWindowResize();

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const appContextValues = {
    isMobile,
    isDesktop,
    isTablet,
  };

  return (
    <AppContext.Provider value={appContextValues}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { useAppContext, AppContextProvider };
