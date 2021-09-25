import React, { useContext } from 'react';

import { PanelTabsClasses } from '../PanelTabs.d';

interface PanelTabsContext {
  classes?: PanelTabsClasses;
}

const PanelTabsContext = React.createContext<PanelTabsContext>({});

export const usePanelTabsContext = () => useContext(PanelTabsContext);

export default PanelTabsContext;
