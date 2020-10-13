import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivetRoute = ({ children, ...rest }) => {
        let user={
          email:''
        }
        const all=sessionStorage.getItem('user')
        const newUser=JSON.parse(all)
         user={...user,...newUser }
        return (
          <Route
            {...rest}
            render={({ location }) =>
            user.email ? (
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

export default PrivetRoute;