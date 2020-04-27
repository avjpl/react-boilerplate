import React, { useState, Children, cloneElement } from 'react';

import Image from './Image';
import Video from './Video';

import styles from './Gallery.css';

const Gallery = ({ children }: any) => {
  const [type, setType] = useState('Image');

  const handleClick = (type: string) => () => setType(type);

  return (
    <div className={styles.gallery}>
      {Children.map(children, child => {
        const name = child.type.name;
        if (name === type) {
          return cloneElement(child);
        }
      })}

      {Children.map(children, child => {
        const name = child.type.name;
        return <button
          className={styles.gallery__button}
          onClick={handleClick(name)}
        >
          {name}
        </button>;
      })}
    </div>
  );
};

Gallery.Image = Image;
Gallery.Video = Video;

export default Gallery;
