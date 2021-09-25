import React from 'react';
import clsx from 'clsx';

import { usePanelContext } from '../PanelContext';
import styles from './PanelNavigation.module.scss';

export interface Props {
  className?: string;
}

const PanelNavigation: React.FC<Props> = ({ className }) => {
  const { classes } = usePanelContext();

  return (
    <div
      className={clsx(
        styles['PanelNavigation'],
        classes?.navigation,
        className
      )}
    >
      <div>PanelNavigation</div>
    </div>
  );
};

export default PanelNavigation;
