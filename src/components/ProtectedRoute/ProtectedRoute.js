import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ ...props }) => {

  useEffect(() => {
    if (!props.isLoggedIn) {
      props.handleLoginOpen();
    }
  }, [props]);

  return (
    <Route {...props}>
      {() => props.isLoggedIn ? props.children : <Redirect to="./home" />}
    </Route>
  )
}

export default ProtectedRoute;