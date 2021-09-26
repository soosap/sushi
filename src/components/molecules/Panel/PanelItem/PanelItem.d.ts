import { PanelClasses } from '../Panel.d';

export type PanelItemClasses = Omit<
  PanelClasses,
  'carousel' | 'container' | 'navigation' | 'tabs'
>;
