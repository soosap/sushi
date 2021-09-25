import { PanelClasses } from '../Panel.d';

export type PanelItemClasses = Omit<
  PanelClasses,
  'container' | 'navigation' | 'tabs'
>;
