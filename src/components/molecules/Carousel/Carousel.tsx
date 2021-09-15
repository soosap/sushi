import React from 'react';
import clsx from 'clsx';

import CaretLeftIcon from 'icons/caret-left.svg';
import CaretRightIcon from 'icons/caret-right.svg';
import Icon from 'atoms/Icon';
import CarouselTrack, { CarouselTrackProps } from './CarouselTrack';
import styles from './Carousel.module.scss';

interface FC<P = {}> extends React.FC<P> {
  Track: React.FC<CarouselTrackProps>;
}

export interface Props {
  className?: string;
  arrowLeft?: React.FC;
  arrowRight?: React.FC;
  classes?: {
    container?: string;
    track?: string;
    arrow?: string;
  };
}

const Carousel: FC<Props> = ({
  className,
  children,
  arrowLeft: ArrowLeft = () => <Icon svg={CaretLeftIcon} />,
  arrowRight: ArrowRight = () => <Icon svg={CaretRightIcon} />,
  classes,
}) => {
  return (
    <div className={clsx(styles['Carousel'], className, classes?.container)}>
      <CarouselTrack className={classes?.track}>{children}</CarouselTrack>
      <div
        className={clsx(
          styles['Carousel__arrow'],
          styles['Carousel__arrow--left'],
          classes?.arrow
        )}
      >
        <ArrowLeft />
      </div>
      <div
        className={clsx(
          styles['Carousel__arrow'],
          styles['Carousel__arrow--right'],
          classes?.arrow
        )}
      >
        <ArrowRight />
      </div>
    </div>
  );
};

Carousel.Track = CarouselTrack;

export default Carousel;
