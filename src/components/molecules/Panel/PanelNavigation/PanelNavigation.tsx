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
  children: React.ReactNode;
}

const PanelNavigation = React.forwardRef<HTMLDivElement, Props>(
  ({ children, className }, navigationRef) => {
    const { classes } = usePanelContext();
    const trackRef = useRef<HTMLDivElement>();
    const [arrowLeftEnabled, setArrowLeftEnabled] = useState<boolean>(false);
    const [arrowRightEnabled, setArrowRightEnabled] = useState<boolean>(false);

    const handleScroll = throttle(100, () => {
      const leftEnabled = trackRef.current.scrollLeft > 0;
      const rightEnabled =
        trackRef.current.scrollWidth - trackRef.current.scrollLeft >
        trackRef.current.clientWidth;

      setArrowLeftEnabled(leftEnabled);
      setArrowRightEnabled(rightEnabled);
    });

    const handleLeftArrowClick = () => {
      if (arrowLeftEnabled) {
        const navigationItems = trackRef.current.getElementsByClassName(
          'PanelNavigationItem'
        );

        let itemToMove: Element;
        Array.from(navigationItems).reduce((prev, curr) => {
          if (prev - curr.clientWidth > 0) {
            // not the one to move
            return prev - curr.clientWidth;
          } else if (!itemToMove) {
            itemToMove = curr;
          }
        }, trackRef.current.scrollLeft);

        trackRef.current.scrollTo({
          left: trackRef.current.scrollLeft - itemToMove.clientWidth,
          behavior: 'smooth',
        });
      }
    };

    const handleRightArrowClick = () => {
      if (arrowRightEnabled) {
        const navigationItems = trackRef.current.getElementsByClassName(
          'PanelNavigationItem'
        );

        let itemToMove: Element;
        Array.from(navigationItems)
          .reverse()
          .reduce((prev, curr) => {
            if (prev - curr.clientWidth > 0) {
              // not the one to move
              return prev - curr.clientWidth;
            } else if (!itemToMove) {
              itemToMove = curr;
            }
          }, trackRef.current.scrollLeft);

        trackRef.current.scrollTo({
          left: trackRef.current.scrollLeft + itemToMove.clientWidth,
          behavior: 'smooth',
        });
      }
    };

    useEffect(() => {
      window.addEventListener('resize', handleScroll);
      return () => window.removeEventListener('resize', handleScroll);
    }, []);

    useEffect(handleScroll, []);

    return (
      <div
        ref={navigationRef}
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
              arrowLeftEnabled || arrowRightEnabled,
          })}
          onScroll={handleScroll}
        >
          <div
            role="button"
            onClick={handleLeftArrowClick}
            className={clsx(
              styles['PanelNavigation__arrow'],
              styles['PanelNavigation__arrow--left'],
              {
                [styles['PanelNavigation__arrow--disabled']]: !arrowLeftEnabled,
                [styles['PanelNavigation__arrow--hidden']]:
                  !arrowLeftEnabled && !arrowRightEnabled,
              }
            )}
          >
            <Icon svg={CaretLeftIcon} />
          </div>
          {children}
        </div>
        <div
          role="button"
          onClick={handleRightArrowClick}
          className={clsx(
            styles['PanelNavigation__arrow'],
            styles['PanelNavigation__arrow--right'],
            {
              [styles['PanelNavigation__arrow--disabled']]: !arrowRightEnabled,
              [styles['PanelNavigation__arrow--hidden']]:
                !arrowLeftEnabled && !arrowRightEnabled,
            }
          )}
        >
          <Icon svg={CaretRightIcon} />
        </div>
        <div
          className={clsx(
            styles['PanelNavigation__spaceBetween'],
            'PanelNavigation__spaceBetween'
          )}
        />
      </div>
    );
  }
);

export default PanelNavigation;
