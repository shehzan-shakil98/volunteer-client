import React, { useContext } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
  } from "react-router-dom";
import { Context } from '../../App';

const PrivateRoute = ({ children, ...rest }) => {
  const [user, setUser] = useContext(Context);
    return (
        <Route
        {...rest}
        render={({ location }) =>
          user.email? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
};

export default PrivateRoute;