import React from 'react';
import clsx from 'clsx';

import { useCarouselContext } from '../CarouselContext';
import styles from './CarouselTrack.module.scss';

export interface Props {
  className?: string;
}

const CarouselTrack: React.FC<Props> = ({ className, children }) => {
  const { classes } = useCarouselContext();

  return (
    <div className={clsx(styles['CarouselTrack'], className, classes?.track)}>
      {children}
    </div>
  );
};

export default CarouselTrack;
