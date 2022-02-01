import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ ...props }) => {
  const isLoggedIn = localStorage.getItem('isLogged')

  useEffect(() => {
    if (!isLoggedIn) {
      props.handleLoginOpen();
    }
  }, [isLoggedIn, props]);

  return (
    <Route {...props}>
      {() => isLoggedIn ? props.children : <Redirect to="./home" />}
    </Route>
  )
}

export default ProtectedRoute;