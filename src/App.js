import '@babel/polyfill';
import React, { Fragment } from 'react';


import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { WebSocketLink } from "apollo-link-ws";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";

import { BrowserRouter as Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import { routes } from './routes/syncRoutes';

const httpLink = createHttpLink({ uri: "http://snowtooth.moonhighway.com" });

const wsLink = new WebSocketLink({
  uri: `ws://snowtooth.moonhighway.com/graphql`,
  options: {
    reconnect: true,
    lazy: true,
  }
});

const linkSplit = split(
  ({ query }) => {
    console.log({query})
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

const authLink = setContext((_, { headers }) => {
  console.log({ headers });

  return {
    headers: {
      // 'x-api-key': 'some-key'
      ...headers
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(linkSplit),
  cache: new InMemoryCache()
});

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <Fragment>
        <nav>
          <ul>
            <li>
              <a target="_blank" href='https://reactjs.org/docs/getting-started.html'>React docs</a>
            </li>
          </ul>
        </nav>

        {renderRoutes(routes)}
      </Fragment>
    </Router>

  </ApolloProvider>
);

export default App;
