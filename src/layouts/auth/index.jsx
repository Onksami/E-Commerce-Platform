
import React from 'react'
import PropTypes from 'prop-types';


export default function AuthLayout({children}) {
  return (

    <>
    <div>
        This is auth.
    </div>

    {children}

    </>
 

  );
};

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired
};