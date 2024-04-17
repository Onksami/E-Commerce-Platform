import PropTypes from 'prop-types';
import React, { useMemo, useState, useEffect } from "react";

export const AuthContext = React.createContext();

export default function Index({ children }) {
  // State and useEffect usage here
  const [session, setSession] = useState(null);
  const [test, setTest] = useState("");

  useEffect(() => {
    // Check if there is data in local storage
    const storedSession = localStorage.getItem("session");
    if (storedSession) {
      // If data exists, parse it and set it as the session
      setSession(JSON.parse(storedSession));
    }
  }, []);

  // Save session data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("session", JSON.stringify(session));
  }, [session]);

  // Check if session is null
  useEffect(() => {
    if (session === null) {
      console.log("user is not logged in");
    }
  }, [session]);

  // Memoize the value using useMemo
  const contextValue = useMemo(() => ({
    session,
    setSession,
    test,
    setTest
  }), [session, test]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

Index.propTypes = {
  children: PropTypes.node
};

