import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

export const ProtectedRoute = ({ children, ...rest }) => {
  const { loggedIn } = useSelector((state) => state.user);
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={({ location }) => (loggedIn ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      ))}
    />
  );
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
