import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useMemo, useState, useEffect } from "react";

export const AuthContext = React.createContext();

export default function Index({ children }) {
  // State and useEffect usage here
  const [session, setSession] = useState(null);

  async function fetchDataAndSetSession(token) {
    try {
      const userData = await axios.get(
        'https://express-app-1.up.railway.app/api/v1/users/account',
        {
          headers: {
            authorization: token,
          },
        }
      );
  
      console.log("Auth userdata", userData);
  
      const _session = {
        user: userData.data.data
      };
  
      setSession(_session);
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Handle error here
    }
  }
  




  useEffect(() => {
    // Check if there is data in local storage
    const token = localStorage.getItem("token");
    if (token) {

      fetchDataAndSetSession(token);

    }
  }, []);



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

  }), [session]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

Index.propTypes = {
  children: PropTypes.node
};

