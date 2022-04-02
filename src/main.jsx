import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import AUTH_CONFIG from "./Config/auth0_variables";

ReactDOM.render(
  <Auth0Provider
    domain={AUTH_CONFIG.domain}
    clientId={AUTH_CONFIG.clientId}
    redirectUri={window.location.origin}
    audience={AUTH_CONFIG.audience}
    scope={AUTH_CONFIG.scope}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
