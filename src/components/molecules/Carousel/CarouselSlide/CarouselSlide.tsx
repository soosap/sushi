import React from 'react';
import clsx from 'clsx';

import { useCarouselContext } from '../CarouselContext';
import styles from './CarouselSlide.module.scss';

export interface Props {
  className?: string;
  slideIndex: number;
}

const CarouselSlide: React.FC<Props> = ({
  className,
  children,
  slideIndex,
}) => {
  const { classes, slidesPerRow, selectedIndex } = useCarouselContext();

  return (
    <div
      className={clsx(styles['CarouselSlide'], className, classes?.slide, {
        [styles['CarouselSlide--invisible']]:
          slideIndex >= selectedIndex + slidesPerRow,
      })}
    >
      {children}
    </div>
  );
};

export default CarouselSlide;
