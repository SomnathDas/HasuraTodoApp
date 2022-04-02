import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import useAccessToken from "./Hooks/useAccessToken";
import LoginButton from "./Components/Auth/Login";
import TodoWrapper from "./Components/Todos/TodoWrapper";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import "./App.css";
import Loader from "./Components/Loader";

const createApolloClient = (authToken) => {
  return new ApolloClient({
    link: new WebSocketLink({
      uri: "wss://sharp-poodle-10.hasura.app/v1/graphql",
      options: {
        reconnect: true,
        connectionParams: {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      },
    }),
    cache: new InMemoryCache(),
  });
};

function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  const idToken = useAccessToken();

  if (isLoading) {
    return (
      <div className="loading">
        <Loader />
      </div>
    );
  }

  if (!idToken && !isAuthenticated) {
    return <LoginButton />;
  }
  return (
    <ApolloProvider client={createApolloClient(idToken)}>
      <div className="row container-fluid p-left-right-0 m-left-right-0">
        <div className="row col-md-9 p-left-right-0 m-left-right-0">
          <div className="col-md-6 p-30">
            <TodoWrapper />
          </div>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
