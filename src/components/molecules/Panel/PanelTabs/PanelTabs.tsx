import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

import { PanelTabProps } from '../PanelTab';
import { usePanelContext } from '../PanelContext';
import PanelTabsContext from './PanelTabsContext';
import { PanelTabsClasses } from './PanelTabs.d';
import styles from './PanelTabs.module.scss';

export interface Props {
  __type?: 'PanelTabs';
  activeClassName?: string;
  classes?:
    | PanelTabsClasses
    | ((props: { isPanelSelected: boolean }) => PanelTabsClasses);
  className?: string;
  initiallySelectedTabIndex?: number;
  name: string;
  navigationItem?: (props: { isPanelSelected: boolean }) => React.ReactElement;
  panelIndex?: number;
}

const PanelTabs: React.FC<Props> = ({
  children,
  classes: initialPanelTabsClasses,
  className,
  panelIndex = 0,
}) => {
  const [panelTabsClasses, setPanelTabsClasses] = useState<PanelTabsClasses>();
  const { classes, selectedTabIndexRecord, selectedPanelIndex } =
    usePanelContext();

  const tabs = React.Children.toArray(children).filter((child) => {
    return React.isValidElement(child) && child.props.__type === 'PanelTab';
  });

  const tabsProps: PanelTabProps[] = tabs.map(
    (tab) => React.isValidElement(tab) && tab.props
  );

  const selectedTabIndex = selectedTabIndexRecord?.[panelIndex];

  useEffect(() => {
    const dynamicClasses =
      typeof initialPanelTabsClasses === 'function'
        ? initialPanelTabsClasses({
            isPanelSelected: panelIndex === selectedPanelIndex,
          })
        : initialPanelTabsClasses;

    setPanelTabsClasses(dynamicClasses);
  }, [panelIndex, selectedPanelIndex]);

  if (selectedTabIndex === undefined) return null;

  return (
    <div
      className={clsx(
        styles['PanelTabs'],
        classes?.tabs,
        panelTabsClasses?.tabs,
        className
      )}
    >
      <PanelTabsContext.Provider value={{ classes: panelTabsClasses }}>
        {/* <div className={styles['PanelTabs__header']}>
          {tabsProps.map((tabProps, index) =>
            tabProps.label({ isTabSelected: index === selectedTabIndex })
          )}
        </div> */}
        <div className={styles['PanelTabs__body']}>{children}</div>
      </PanelTabsContext.Provider>
    </div>
  );
};

PanelTabs.defaultProps = {
  __type: 'PanelTabs',
  initiallySelectedTabIndex: 0,
};

export default PanelTabs;
