import '@babel/polyfill';
import React, { Fragment } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import { routes } from './routes/syncRoutes';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
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
