export interface PanelClasses {
  container?: string;
  navigation?: string;
  navigationItem?: string;
  item?: string;
  tabs?: string;
  tab?: string;
}

export enum PanelType {
  PLAIN = 'plain',
  CAROUSEL = 'carousel',
  STACK = 'stack',
}
