import React, { useContext } from 'react';

import { CarouselClasses } from '..';

interface CarouselContext {
  classes?: CarouselClasses;
  handleNext: () => void;
  handlePrev: () => void;
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  setTrackPosition: React.Dispatch<React.SetStateAction<number>>;
  slidesPerRow: number;
  slidesToScroll: number;
  showArrowLeft: boolean;
  showArrowRight: boolean;
  totalNumberOfSlides: number;
  trackPosition: number;
}

const CarouselContext = React.createContext<CarouselContext>({
  handleNext: () => {},
  handlePrev: () => {},
  selectedIndex: 0,
  setSelectedIndex: () => {},
  setTrackPosition: () => {},
  slidesPerRow: 1,
  slidesToScroll: 0,
  showArrowLeft: false,
  showArrowRight: false,
  totalNumberOfSlides: 1,
  trackPosition: 0,
});

export const useCarouselContext = () => useContext(CarouselContext);

export default CarouselContext;
