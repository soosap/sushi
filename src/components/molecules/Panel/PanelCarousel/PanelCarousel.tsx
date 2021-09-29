import React, { useRef, useEffect } from 'react';
import clsx from 'clsx';

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
  const { classes, selectedPanelIndex } = usePanelContext();
  const carouselRef = useRef<HTMLDivElement>();

  useEffect(() => {
    setTimeout(() => {
      Array.from(
        carouselRef.current?.getElementsByClassName('PanelCarousel__slide')
      ).map((elem) =>
        elem.classList.add(styles['PanelCarousel__slide--transition'])
      );
    }, 1000);
  }, []);

  return (
    <div
      ref={carouselRef}
      className={clsx(styles['PanelCarousel'], classes?.carousel, className)}
    >
      {React.Children.map(children, (child, index) => {
        const delta = index - selectedPanelIndex;
        const left =
          delta * ((carouselRef.current?.clientWidth ?? 0) + spaceBetween);

        return (
          <div
            role="button"
            className={clsx(
              styles['PanelCarousel__slide'],
              'PanelCarousel__slide'
            )}
            style={{
              left,
            }}
          >
            {delta < 2 ? child : null}
          </div>
        );
      })}
    </div>
  );
};

export default PanelCarousel;
