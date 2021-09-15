import React from 'react';
import clsx from 'clsx';

import styles from './Card.module.scss';

export interface Props {
  className?: string;
}

const Card: React.FC<Props> = ({ className, children }) => {
  return (
    <div className={clsx(styles['Card'], className)}>
      <div>{children}</div>
    </div>
  );
};

export default Card;
