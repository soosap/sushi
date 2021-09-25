import React, { useRef, useState, useEffect } from 'react';
import { throttle } from 'throttle-debounce';
import clsx from 'clsx';

import CaretLeftIcon from 'icons/caret-left.svg';
import CaretRightIcon from 'icons/caret-right.svg';
import Icon from 'atoms/Icon';
import { usePanelContext } from '../PanelContext';
import styles from './PanelNavigation.module.scss';

export interface Props {
  className?: string;
}

const PanelNavigation: React.FC<Props> = ({ children, className }) => {
  const { classes } = usePanelContext();
  const trackRef = useRef<HTMLDivElement>();
  const [showArrowLeft, setShowArrowLeft] = useState<boolean>(false);
  const [showArrowRight, setShowArrowRight] = useState<boolean>(false);

  const handleScroll = throttle(100, () => {
    setShowArrowLeft(trackRef.current.scrollLeft > 0);
    setShowArrowRight(
      trackRef.current.scrollWidth - trackRef.current.scrollLeft >
        trackRef.current.clientWidth
    );
  });

  useEffect(() => {
    window.addEventListener('resize', handleScroll);

    return () => window.removeEventListener('resize', handleScroll);
  }, []);

  useEffect(() => handleScroll(), []);

  return (
    <div
      className={clsx(
        styles['PanelNavigation'],
        classes?.navigation,
        className
      )}
    >
      <div
        ref={trackRef}
        className={clsx(styles['PanelNavigation__track'], {
          [styles['PanelNavigation__track--scrollable']]:
            showArrowLeft || showArrowRight,
        })}
        onScroll={handleScroll}
      >
        <div
          className={clsx(
            styles['PanelNavigation__arrow'],
            styles['PanelNavigation__arrow--left'],
            {
              [styles['PanelNavigation__arrow--disabled']]: !showArrowLeft,
              [styles['PanelNavigation__arrow--hidden']]:
                !showArrowLeft && !showArrowRight,
            }
          )}
        >
          <Icon svg={CaretLeftIcon} />
        </div>
        {children}
      </div>
      <div
        className={clsx(
          styles['PanelNavigation__arrow'],
          styles['PanelNavigation__arrow--right'],
          {
            [styles['PanelNavigation__arrow--disabled']]: !showArrowRight,
            [styles['PanelNavigation__arrow--hidden']]:
              !showArrowLeft && !showArrowRight,
          }
        )}
      >
        <Icon svg={CaretRightIcon} />
      </div>
    </div>
  );
};

export default PanelNavigation;
