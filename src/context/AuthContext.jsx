import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useMemo, useState, useEffect } from "react";

export const AuthContext = React.createContext();

export default function Index({ children }) {
  // State and useEffect usage here
  const [session, setSession] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);


  async function fetchDataAndSetSession(accessToken) {
    try {
      const userData = await axios.get(
        'https://java-api-production.up.railway.app/users/account',
        {
          headers: {
            authorization: accessToken,
          },
        }
      );
  
      console.log("Auth userdata", userData);
  
      const _session = {
        user: userData.data
      };
  
      setSession(_session);
      /* eslint-disable */
      const isAdmin = userData.data.roles.some(role => role.name === 'ADMIN');
      if (isAdmin) { // if is accepted true directly.
        setIsAdmin (isAdmin);
        console.log("Context isAdmin " , isAdmin);
      } else {
        console.error("userData is not properly defined or roles is not an array");
      }


    } catch (error) {
      console.error('Error fetching user data:', error);
      // Handle error here
    }
  }
  




  useEffect(() => {
    // Check if there is data in local storage
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {

      fetchDataAndSetSession(accessToken);

    }
  }, []);





  // Memoize the value using useMemo
  const contextValue = useMemo(() => ({
    session,
    setSession,
    isAdmin,
    setIsAdmin,

    

  }), [session, isAdmin]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

Index.propTypes = {
  children: PropTypes.node
};

