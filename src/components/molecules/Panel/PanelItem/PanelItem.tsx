import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

import { usePanelContext } from '../PanelContext';
import { PanelItemClasses } from './PanelItem.d';
import styles from './PanelItem.module.scss';

export interface Props {
  __type?: 'PanelItem';
  activeClassName?: string;
  classes?:
    | PanelItemClasses
    | ((props: { isPanelSelected: boolean }) => PanelItemClasses);
  className?: string;
  name: string;
  navigationItem?: (props: { isPanelSelected: boolean }) => React.ReactElement;
  panelIndex?: number;
}

const PanelItem: React.FC<Props> = ({
  children,
  className,
  classes: initialPanelItemClasses,
  panelIndex,
}) => {
  const [panelItemClasses, setPanelItemClasses] = useState<PanelItemClasses>();
  const { classes, selectedPanelIndex } = usePanelContext();

  useEffect(() => {
    const dynamicClasses =
      typeof initialPanelItemClasses === 'function'
        ? initialPanelItemClasses({
            isPanelSelected: panelIndex === selectedPanelIndex,
          })
        : initialPanelItemClasses;

    setPanelItemClasses(dynamicClasses);
  }, [panelIndex, selectedPanelIndex]);

  return (
    <div
      className={clsx(
        styles['PanelItem'],
        classes?.item,
        panelItemClasses?.item,
        className
      )}
    >
      {children}
    </div>
  );
};

PanelItem.defaultProps = {
  __type: 'PanelItem',
};

export default PanelItem;
