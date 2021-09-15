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
  const { classes, slidesPerRow, slidesToScroll, selectedIndex } =
    useCarouselContext();

  console.log('-'.repeat(50));
  console.log('slideIndex', slideIndex);
  console.log('selectedIndex', selectedIndex);
  console.log('slidesPerRow', slidesPerRow);
  console.log('slidesToScroll', slidesToScroll);

  return (
    <div
      className={clsx(styles['CarouselSlide'], className, classes?.slide, {
        [styles['CarouselSlide--invisible']]:
          slideIndex >= selectedIndex + slidesPerRow ||
          slideIndex < selectedIndex,
      })}
    >
      {children}
    </div>
  );
};

export default CarouselSlide;
