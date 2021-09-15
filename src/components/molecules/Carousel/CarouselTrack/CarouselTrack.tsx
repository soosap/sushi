import React from 'react';
import clsx from 'clsx';

import styles from './CarouselTrack.module.scss';

export interface Props {
  className?: string;
}

const CarouselTrack: React.FC<Props> = ({ className, children }) => {
  return (
    <div className={clsx(styles['CarouselTrack'], className)}>{children}</div>
  );
};

export default CarouselTrack;
