import { PanelClasses } from '../Panel.d';

export type PanelTabsClasses = Omit<
  PanelClasses,
  'container' | 'navigation' | 'item'
>;
