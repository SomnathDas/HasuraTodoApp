import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    !isAuthenticated && (
      <div className="overlay">
        <div className="overlay-content">
          <div className="overlay-heading">
            Welcome to TodoList Powered by Hasura Cloud
          </div>
          <div className="overlay-message">Please login to continue</div>
          <div className="overlay-action">
            <button
              id="qsLoginBtn"
              variant="primary"
              className="btn-margin loginBtn"
              onClick={() => {
                loginWithRedirect({});
              }}
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default LoginButton;
