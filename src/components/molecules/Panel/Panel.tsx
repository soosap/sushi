import React from 'react';
import clsx from 'clsx';

import { PanelClasses } from './Panel.d';
import styles from './Panel.module.scss';

export interface Props {
  className?: string;
  classes?: PanelClasses;
}

const Panel: React.FC<Props> = ({ className, classes }) => {
  return (
    <div className={clsx(styles['Panel'], classes?.container, className)}>
      <div>Panel</div>
    </div>
  );
};

export default Panel;
