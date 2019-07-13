import React, { useEffect } from 'react';

import styles from './Home.css';

const Home = () => {
  useEffect(() => {
    console.log('mounted');
    document.title = 'Skeleton';
  }), [];

  return (
    <div>
      <h1 className={styles.text}>Skeleton</h1>
    </div>
  );
};

export default Home;
