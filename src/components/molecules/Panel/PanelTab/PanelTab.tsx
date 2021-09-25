import React from 'react';
import clsx from 'clsx';

import { usePanelContext } from '../PanelContext';
import { usePanelTabsContext } from '../PanelTabs/PanelTabsContext';
import styles from './PanelTab.module.scss';

export interface Props {
  __type?: 'PanelTab';
  className?: string;
  label: (props: { isTabSelected: boolean }) => React.ReactElement;
  name: string;
}

const PanelTab: React.FC<Props> = ({ children, className }) => {
  const { classes } = usePanelContext();
  const { classes: panelTabsClasses } = usePanelTabsContext();

  return (
    <div
      className={clsx(
        styles['PanelTab'],
        classes?.tab,
        panelTabsClasses?.tab,
        className
      )}
    >
      {children}
    </div>
  );
};

PanelTab.defaultProps = {
  __type: 'PanelTab',
};

export default PanelTab;
