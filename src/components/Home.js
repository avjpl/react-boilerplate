import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import styles from './Home.css';

const query = gql`
  query {
    allLifts {
      id
      name
      status
    }
  }
`;

const Home = () => {
  useEffect(() => {
    console.log('mounted');
    document.title = 'Skeleton';
  }), [];

  const { loading, data } = useQuery(query);

  if (loading) return <h3>Loading...</h3>

  return (
    <section>
      <h1>Snowtooth Lift Status</h1>
      <table>
        <thead>
          <tr>
            <th>Lift Name</th>
            <th>Current Status</th>
          </tr>
        </thead>
        <tbody>
          {data.allLifts.map(lift => (
            <tr key={lift.id}>
              <td>{lift.name}</td>
              <td>{lift.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Home;
