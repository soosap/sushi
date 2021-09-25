import React from 'react';
import clsx from 'clsx';

import { usePanelContext } from '../PanelContext';
import styles from './PanelNavigationItem.module.scss';

export interface Props {
  className?: string;
  isPanelSelected: boolean;
}

const PanelNavigationItem: React.FC<Props> = ({
  className,
  isPanelSelected,
}) => {
  const { classes } = usePanelContext();

  return (
    <div
      className={clsx(
        styles['PanelNavigationItem'],
        classes?.navigationItem,
        className
      )}
    >
      <div>PanelNavigationItem: {isPanelSelected}</div>
    </div>
  );
};

export default PanelNavigationItem;
