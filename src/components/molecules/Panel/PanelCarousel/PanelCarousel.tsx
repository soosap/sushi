import React from 'react';
import clsx from 'clsx';

import { usePanelContext } from '../PanelContext';
import styles from './PanelCarousel.module.scss';

export interface Props {
  className?: string;
}

const PanelCarousel: React.FC<Props> = ({ children, className }) => {
  const { classes } = usePanelContext();

  return (
    <div
      className={clsx(styles['PanelCarousel'], classes?.carousel, className)}
    >
      <div className={clsx(styles['PanelCarousel__track'])}>{children}</div>
    </div>
  );
};

export default PanelCarousel;
