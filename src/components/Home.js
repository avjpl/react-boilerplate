import React, { useEffect } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import StatusIndicator from './StatusIndicator';

const SUBSCRIPTION = gql`
  subscription {
    liftStatusChange {
      id
      status
    }
  }
`;

const MUTATION = gql`
  mutation SetLiftStatus($id: ID!, $status: LiftStatus!) {
    setLiftStatus(id: $id, status: $status) {
      id
      status
    }
  }
`;

const QUERY = gql`
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

  const { loading, data } = useQuery(QUERY);
  const [ setLiftStatus ] = useMutation(MUTATION);
  useSubscription(SUBSCRIPTION);

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
              <td>
                <StatusIndicator
                  status={lift.status}
                  onChange={status => {
                    const variables = { id: lift.id, status };
                    setLiftStatus({ variables });
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Home;
