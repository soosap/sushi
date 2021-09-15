import React from 'react';
import clsx from 'clsx';

import { useCarouselContext } from '../CarouselContext';
import styles from './CarouselTrack.module.scss';

export interface Props {
  arrowLeft: React.FC;
  arrowRight: React.FC;
  className?: string;
}

const CarouselTrack: React.FC<Props> = ({
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  className,
  children,
}) => {
  const { classes, showArrowLeft, showArrowRight } = useCarouselContext();

  return (
    <div className={clsx(styles['CarouselTrack'], className)}>
      {showArrowLeft && (
        <div
          role="button"
          className={clsx(
            styles['CarouselTrack__arrow'],
            styles['CarouselTrack__arrow--left'],
            classes?.arrow
          )}
        >
          <ArrowLeft />
        </div>
      )}
      {children}
      {showArrowRight && (
        <div
          role="button"
          className={clsx(
            styles['CarouselTrack__arrow'],
            styles['CarouselTrack__arrow--right'],
            classes?.arrow
          )}
        >
          <ArrowRight />
        </div>
      )}
    </div>
  );
};

export default CarouselTrack;
