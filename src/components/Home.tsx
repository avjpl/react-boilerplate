import React from 'react';

import Gallery from './Gallery';

const Home = () => {
  return (
    <Gallery>
      <Gallery.Image />
      <Gallery.Video />
    </Gallery>
  );
};

export default Home;
