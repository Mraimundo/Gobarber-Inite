import React, { useContext } from 'react';

import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Navigate
} from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  element: React.ElementType;
}

export const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  element: Componet,
  ...rest
}) => {
  const { user } = useContext(AuthContext)
  return (
    <ReactDOMRoute
      {...rest}
    // render={({location}) => {
    //   return isPrivate === !!user ? (
    //     <Componet />
    //   ) : (
    //     <Navigate 
    //       to={{ pathname: isPrivate ? '/' : '/dashboard',
    //       state: {from: location},
    //     }} 
    //     />
    //   );
    // }}
    />
  );
}