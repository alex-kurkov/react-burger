import { FC, ReactNode } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAppSelector } from '../hooks';

export const ProtectedRoute: FC<{
  path: string;
  exact?: boolean; 
  children: Element | ReactNode;
}> = ({ path, children, ...rest }) => {
  const { loggedIn } = useAppSelector((state) => state.user);
  return (
    <Route
      path={path}
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
