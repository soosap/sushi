import React, { useRef } from 'react';
import clsx from 'clsx';

import { useCarouselContext } from '../CarouselContext';
import styles from './CarouselTrack.module.scss';

export interface Props {
  className?: string;
  position: number;
  children: React.ReactNode;
}

const CarouselTrack = React.forwardRef<HTMLDivElement, Props>(
  ({ className, children, position }, ref) => {
    const { classes } = useCarouselContext();

    return (
      <div
        ref={ref}
        className={clsx(styles['CarouselTrack'], className, classes?.track)}
        style={{ transform: `translateX(${position}px` }}
      >
        {children}
      </div>
    );
  }
);

export default CarouselTrack;
