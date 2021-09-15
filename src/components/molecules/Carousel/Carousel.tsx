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
  onNext?: (slideIndex: number) => void;
  onPrev?: (slideIndex: number) => void;
  slidesPerRow: number;
  slidesToScroll?: number;
}

const Carousel: FC<Props> = ({
  className,
  children,
  arrowLeft: ArrowLeft = () => <Icon svg={CaretLeftIcon} />,
  arrowRight: ArrowRight = () => <Icon svg={CaretRightIcon} />,
  classes,
  initialSlide = 0,
  onNext,
  onPrev,
  slidesPerRow,
  slidesToScroll = 1,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(initialSlide);
  const totalNumberOfSlides = React.Children.count(children);

  const showArrowLeft = selectedIndex > 0;
  const showArrowRight = selectedIndex + slidesToScroll <= totalNumberOfSlides;

  const handleNext = () => {
    const nextSlideIndex = Math.min(
      selectedIndex + slidesToScroll,
      totalNumberOfSlides - 1
    );
    setSelectedIndex(nextSlideIndex);
    onNext && onNext(nextSlideIndex);
  };

  const handlePrev = () => {
    const prevSlideIndex = Math.max(selectedIndex - slidesToScroll, 0);
    setSelectedIndex(prevSlideIndex);
    onPrev && onPrev(prevSlideIndex);
  };

  return (
    <div className={clsx(styles['Carousel'], className, classes?.container)}>
      <CarouselContext.Provider
        value={{
          classes,
          handleNext,
          handlePrev,
          slidesPerRow,
          slidesToScroll,
          selectedIndex,
          setSelectedIndex,
          showArrowLeft,
          showArrowRight,
          totalNumberOfSlides,
        }}
      >
        {showArrowLeft && (
          <div
            role="button"
            onClick={handlePrev}
            className={clsx(
              styles['Carousel__arrow'],
              styles['Carousel__arrow--left'],
              classes?.arrow
            )}
          >
            <ArrowLeft />
          </div>
        )}
        <CarouselTrack>
          {React.Children.map(children, (child, slideIndex) => (
            <CarouselSlide slideIndex={slideIndex}>{child}</CarouselSlide>
          ))}
        </CarouselTrack>
        {showArrowRight && (
          <div
            role="button"
            onClick={handleNext}
            className={clsx(
              styles['Carousel__arrow'],
              styles['Carousel__arrow--right'],
              classes?.arrow
            )}
          >
            <ArrowRight />
          </div>
        )}
      </CarouselContext.Provider>
    </div>
  );
};

Carousel.Track = CarouselTrack;

export default Carousel;
