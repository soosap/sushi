import React, { useState } from 'react';
import clsx from 'clsx';

import CaretLeftIcon from 'icons/caret-left.svg';
import CaretRightIcon from 'icons/caret-right.svg';
import Icon from 'atoms/Icon';
import CarouselTrack, { CarouselTrackProps } from './CarouselTrack';
import CarouselSlide from './CarouselSlide';
import CarouselContext from './CarouselContext';
import { CarouselClasses } from '.';
import styles from './Carousel.module.scss';

interface FC<P = {}> extends React.FC<P> {
  Track: React.FC<CarouselTrackProps>;
}

export interface Props {
  arrowLeft?: React.FC;
  arrowRight?: React.FC;
  classes?: CarouselClasses;
  className?: string;
  initialSlide?: number;
  slidesPerRow: number;
  slidesToScroll?: number;
}

const Carousel: FC<Props> = ({
  className,
  children,
  arrowLeft = () => <Icon svg={CaretLeftIcon} />,
  arrowRight = () => <Icon svg={CaretRightIcon} />,
  classes,
  initialSlide = 0,
  slidesPerRow,
  slidesToScroll = 1,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(initialSlide);
  const totalNumberOfSlides = React.Children.count(children);
  const showArrowLeft =
    totalNumberOfSlides > slidesPerRow && selectedIndex !== 0;
  const showArrowRight =
    totalNumberOfSlides > slidesPerRow &&
    selectedIndex + 1 !== totalNumberOfSlides;

  return (
    <div className={clsx(styles['Carousel'], className, classes?.container)}>
      <CarouselContext.Provider
        value={{
          classes,
          slidesPerRow,
          slidesToScroll,
          selectedIndex,
          setSelectedIndex,
          showArrowLeft,
          showArrowRight,
          totalNumberOfSlides,
        }}
      >
        <CarouselTrack arrowLeft={arrowLeft} arrowRight={arrowRight}>
          {React.Children.map(children, (child, slideIndex) => (
            <CarouselSlide slideIndex={slideIndex}>{child}</CarouselSlide>
          ))}
        </CarouselTrack>
      </CarouselContext.Provider>
    </div>
  );
};

Carousel.Track = CarouselTrack;

export default Carousel;
