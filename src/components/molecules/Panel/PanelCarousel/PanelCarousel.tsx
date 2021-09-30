import React, { useRef, useEffect, useState } from 'react';
import clsx from 'clsx';
import { useSwipeable } from 'react-swipeable';

import { usePanelContext } from '../PanelContext';
import styles from './PanelCarousel.module.scss';

export interface Props {
  className?: string;
  children: React.ReactNode | React.ReactElement[];
  spaceBetween: number;
}

const PanelCarousel: React.FC<Props> = ({
  children,
  className,
  spaceBetween,
}) => {
  const { classes, selectedPanelIndex, setSelectedPanelIndex } =
    usePanelContext();
  const carouselRef = useRef<HTMLDivElement>();
  const [slideWidth, setSlideWidth] = useState<number>();

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      setSelectedPanelIndex((prevIndex) =>
        prevIndex === React.Children.count(children) - 1
          ? prevIndex
          : prevIndex + 1
      );
    },
    onSwipedRight: () => {
      setSelectedPanelIndex((prevIndex) => {
        return prevIndex === 0 ? prevIndex : prevIndex - 1;
      });
    },
  });

  const handleResize = () => {
    setSlideWidth(carouselRef.current?.clientWidth);
  };

  useEffect(() => {
    setTimeout(() => {
      Array.from(
        carouselRef.current?.getElementsByClassName('PanelCarousel__slide')
      ).map((elem) =>
        elem.classList.add(styles['PanelCarousel__slide--transition'])
      );
    }, 1000);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      ref={carouselRef}
      className={clsx(styles['PanelCarousel'], classes?.carousel, className)}
    >
      <div className={styles['PanelCarousel__track']} {...swipeHandlers}>
        {React.Children.map(children, (child, index) => {
          const delta = index - selectedPanelIndex;
          const left =
            delta * ((carouselRef.current?.clientWidth ?? 0) + spaceBetween);

          return (
            <div
              role="button"
              onClick={() => delta !== 0 && setSelectedPanelIndex(index)}
              className={clsx(
                styles['PanelCarousel__slide'],
                'PanelCarousel__slide'
              )}
              style={{
                left,
                width: slideWidth ? slideWidth : 'inherit',
              }}
            >
              {child}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PanelCarousel;
