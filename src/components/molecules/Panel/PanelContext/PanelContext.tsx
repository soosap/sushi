import React, { useContext } from 'react';

interface PanelContext {
  selectedIndex: number;
}

const PanelContext = React.createContext<PanelContext>({
  selectedIndex: 0,
});

export const usePanelContext = () => useContext(PanelContext);

export default PanelContext;
