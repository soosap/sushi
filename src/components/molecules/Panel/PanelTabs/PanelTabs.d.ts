import { PanelClasses } from '../Panel.d';

export type PanelTabsClasses = Omit<
  PanelClasses,
  'carousel' | 'container' | 'navigation' | 'item'
>;
