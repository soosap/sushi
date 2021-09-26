import React from 'react';
import clsx from 'clsx';

import { usePanelContext } from '../PanelContext';
import styles from './PanelNavigationItem.module.scss';

export interface Props {
  className?: string;
  disabled?: boolean;
  isPanelSelected: boolean;
  panelIndex: number;
}

const PanelNavigationItem: React.FC<Props> = ({
  children,
  className,
  disabled = false,
  isPanelSelected,
  panelIndex,
}) => {
  const { classes, setSelectedPanelIndex } = usePanelContext();

  const handleClick = () => {
    setSelectedPanelIndex(panelIndex);
  };

  return (
    <div
      role="button"
      onClick={handleClick}
      className={clsx(
        'PanelNavigationItem',
        styles['PanelNavigationItem'],
        classes?.navigationItem,
        className,
        {
          [styles['PanelNavigationItem--disabled']]: disabled,
          [styles['PanelNavigationItem--active']]: isPanelSelected,
        }
      )}
    >
      {children}
    </div>
  );
};

export default PanelNavigationItem;
