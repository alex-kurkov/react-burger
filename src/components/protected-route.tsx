import { FC, ReactNode } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IStore } from '../types';

export const ProtectedRoute: FC<{
  path: string;
  exact?: boolean; 
  children: Element | ReactNode;
}> = ({ path, children, ...rest }) => {
  const { loggedIn } = useSelector((state: IStore) => state.user);
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
