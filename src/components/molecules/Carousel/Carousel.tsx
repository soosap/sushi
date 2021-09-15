import React from 'react';
import clsx from 'clsx';

import styles from './Carousel.module.scss';

export interface Props {
  className?: string;
}

const Carousel: React.FC<Props> = ({ className }) => {
  return (
    <div className={clsx(styles['Carousel'], className)}>
      <div>Carousel</div>
    </div>
  );
};

export default Carousel;
