import React from 'react';
import clsx from 'clsx';

import { usePanelContext } from '../PanelContext';
import styles from './PanelNavigationItem.module.scss';

export interface Props {
  className?: string;
  disabled?: boolean;
  isPanelSelected: boolean;
}

const PanelNavigationItem: React.FC<Props> = ({
  children,
  className,
  disabled = false,
  isPanelSelected,
}) => {
  const { classes } = usePanelContext();

  return (
    <div
      className={clsx(
        styles['PanelNavigationItem'],
        classes?.navigationItem,
        className,
        { [styles['PanelNavigationItem--disabled']]: disabled }
      )}
    >
      {children}
      <div
        role="button"
        className={clsx(styles['PanelNavigationItem__clickableArea'], {
          [styles['PanelNavigationItem__clickableArea--disabled']]: disabled,
        })}
      />
    </div>
  );
};

export default PanelNavigationItem;
