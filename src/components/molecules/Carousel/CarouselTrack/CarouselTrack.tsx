import React from 'react';
import clsx from 'clsx';
import { useSwipeable } from 'react-swipeable';

import { useCarouselContext } from '../CarouselContext';
import styles from './CarouselTrack.module.scss';

export interface Props {
  className?: string;
  position: number;
  children: React.ReactNode;
}

const CarouselTrack = React.forwardRef<HTMLDivElement, Props>(
  ({ className, children, position }, ref) => {
    const { classes, showArrowLeft, showArrowRight, handlePrev, handleNext } =
      useCarouselContext();

    const swipeHandlers = useSwipeable({
      onSwipedLeft: () => showArrowRight && handleNext(),
      onSwipedRight: () => showArrowLeft && handlePrev(),
    });

    return (
      <div
        className={clsx(styles['CarouselTrack'], className, classes?.track)}
        style={{ transform: `translateX(${position}px` }}
        ref={ref}
      >
        <div className={styles['CarouselTrack__inner']} {...swipeHandlers}>
          {children}
        </div>
      </div>
    );
  }
);

export default CarouselTrack;
