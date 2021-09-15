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
      className={clsx(
        'CarouselSlide',
        styles['CarouselSlide'],
        className,
        classes?.slide,
        {
          [styles['CarouselSlide--outOfFocus']]:
            slideIndex >= selectedIndex + slidesPerRow ||
            slideIndex < selectedIndex,
        }
      )}
    >
      {children}
    </div>
  );
};

export default CarouselSlide;
