import React from 'react';
import clsx from 'clsx';

import styles from './Icon.module.scss';

export interface Props {
  className?: string;
  svg: React.FC<React.SVGProps<SVGSVGElement>>;
}

const Icon: React.FC<Props> = ({ className, svg: SVG }) => {
  return (
    <div className={clsx(styles['Icon'], className)}>
      <SVG
        className={clsx({
          [styles['Icon__svg']]: true,
        })}
      />
    </div>
  );
};

export default Icon;
