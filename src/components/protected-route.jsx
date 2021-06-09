import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const ProtectedRoute = ({ children, ...rest }) => {
  let { loggedIn } = useSelector(state => state.user);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        loggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { 'from': location }
            }}
          />
        )
      }
    />
  );
}