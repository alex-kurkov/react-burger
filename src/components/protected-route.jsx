import { Redirect, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../services/actions/auth'

export const ProtectedRoute = ({ children, ...rest }) => {
  const { loggedIn } = useSelector(state => state.user);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        loggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}