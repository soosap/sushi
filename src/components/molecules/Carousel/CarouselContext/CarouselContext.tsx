import React, { useContext } from 'react';

import { CarouselClasses } from '..';

interface CarouselContext {
  classes?: CarouselClasses;
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  slidesPerRow: number;
  slidesToScroll: number;
  showArrowLeft: boolean;
  showArrowRight: boolean;
  totalNumberOfSlides: number;
}

const CarouselContext = React.createContext<CarouselContext>({
  selectedIndex: 0,
  setSelectedIndex: () => {},
  slidesPerRow: 1,
  slidesToScroll: 1,
  showArrowLeft: false,
  showArrowRight: false,
  totalNumberOfSlides: 1,
});

export const useCarouselContext = () => useContext(CarouselContext);

export default CarouselContext;
