import React, { useState, useRef } from 'react';
import clsx from 'clsx';

import CaretLeftIcon from 'icons/caret-left.svg';
import CaretRightIcon from 'icons/caret-right.svg';
import Icon from 'atoms/Icon';
import CarouselTrack from './CarouselTrack';
import CarouselSlide from './CarouselSlide';
import CarouselContext from './CarouselContext';
import { CarouselClasses } from './Carousel.d';
import styles from './Carousel.module.scss';

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

const Carousel: React.FC<Props> = ({
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
  const carouselRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(initialSlide);
  const [trackPosition, setTrackPosition] = useState<number>(0);
  const totalNumberOfSlides = React.Children.count(children);

  const showArrowLeft = selectedIndex > 0;
  const showArrowRight = selectedIndex + slidesToScroll < totalNumberOfSlides;

  const handleNext = () => {
    const arrow =
      carouselRef.current.getElementsByClassName('Carousel__arrow')[0];

    const itemsToShift = Array.from(
      trackRef.current.getElementsByClassName('CarouselSlide')
    ).slice(selectedIndex, selectedIndex + slidesToScroll);

    const amountToShift = itemsToShift
      .map((item) => item.clientWidth)
      .reduce((prev, curr) => prev + curr, 0);

    setTrackPosition((prevPosition) =>
      prevPosition === 0
        ? (arrow?.clientWidth || 0) - amountToShift
        : prevPosition - amountToShift
    );

    const nextSlideIndex = Math.min(
      selectedIndex + slidesToScroll,
      totalNumberOfSlides
    );
    setSelectedIndex(nextSlideIndex);
    onNext && onNext(nextSlideIndex);
  };

  const handlePrev = () => {
    const arrow =
      carouselRef.current.getElementsByClassName('Carousel__arrow')[0];

    const itemsToShift = Array.from(
      trackRef.current.getElementsByClassName('CarouselSlide')
    ).slice(selectedIndex - slidesToScroll, selectedIndex);

    const amountToShift = itemsToShift
      .map((item) => item.clientWidth)
      .reduce((prev, curr) => prev + curr, 0);

    const prevSlideIndex = Math.max(selectedIndex - slidesToScroll, 0);

    setTrackPosition((prevPosition) =>
      prevSlideIndex === 0
        ? prevPosition + amountToShift - (arrow?.clientWidth || 0)
        : prevPosition + amountToShift
    );

    setSelectedIndex(prevSlideIndex);
    onPrev && onPrev(prevSlideIndex);
  };

  return (
    <div
      ref={carouselRef}
      className={clsx(styles['Carousel'], className, classes?.container)}
    >
      <CarouselContext.Provider
        value={{
          classes,
          handleNext,
          handlePrev,
          slidesPerRow,
          slidesToScroll,
          selectedIndex,
          setSelectedIndex,
          setTrackPosition,
          showArrowLeft,
          showArrowRight,
          totalNumberOfSlides,
          trackPosition,
        }}
      >
        {showArrowLeft && (
          <div
            role="button"
            onClick={handlePrev}
            className={clsx(
              'Carousel__arrow',
              styles['Carousel__arrow'],
              styles['Carousel__arrow--left'],
              classes?.arrow
            )}
          >
            <ArrowLeft />
          </div>
        )}
        <CarouselTrack ref={trackRef} position={trackPosition}>
          {React.Children.map(children, (child, slideIndex) => (
            <CarouselSlide slideIndex={slideIndex}>{child}</CarouselSlide>
          ))}
        </CarouselTrack>
        {showArrowRight && (
          <div
            role="button"
            onClick={handleNext}
            className={clsx(
              'Carousel__arrow',
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

export default Carousel;
