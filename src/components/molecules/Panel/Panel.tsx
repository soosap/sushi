import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

import PanelContext from './PanelContext';
import PanelCarousel from './PanelCarousel';
import PanelNavigation from './PanelNavigation';
import PanelNavigationItem from './PanelNavigationItem';
import PanelItem, { PanelItemProps } from './PanelItem';
import PanelTabs, { PanelTabsProps } from './PanelTabs';
import PanelTab, { PanelTabProps } from './PanelTab';
import { PanelClasses, PanelType } from './Panel.d';
import styles from './Panel.module.scss';

interface FC<P = {}> extends React.FC<P> {
  Item: React.FC<PanelItemProps>;
  Tabs: React.FC<PanelTabsProps>;
  Tab: React.FC<PanelTabProps>;
}

export interface Props {
  className?: string;
  classes?:
    | PanelClasses
    | ((props: { selectedPanelName: string }) => PanelClasses);
  initiallySelectedIndex?: number;
  type?: PanelType;
}

const Panel: FC<Props> = ({
  children,
  className,
  classes: initialClasses,
  initiallySelectedIndex: initiallySelectedPanelIndex = 0,
  type = PanelType.PLAIN,
}) => {
  const navigationRef = useRef<HTMLDivElement>();

  const [selectedPanelIndex, setSelectedPanelIndex] = useState<number>(
    initiallySelectedPanelIndex
  );

  const [selectedTabIndexRecord, setSelectedTabIndexRecord] =
    useState<Record<number, number>>();

  const [panelNameRecord, setPanelNameRecord] = useState<
    Record<number, string>
  >({});

  const [classes, setClasses] = useState<PanelClasses>();

  const panelItems = React.Children.toArray(children).filter((child) => {
    return (
      React.isValidElement(child) &&
      ['PanelTabs', 'PanelItem'].includes(child.props.__type)
    );
  });

  const panelItemProps: (PanelTabsProps | PanelItemProps)[] = panelItems.map(
    (tab) => React.isValidElement(tab) && tab.props
  );

  const panelItemPropsWhereHasNavigationItem = panelItemProps.filter(
    (panelItem) => panelItem.navigationItem
  );

  const spaceBetween = Number(
    navigationRef.current?.getElementsByClassName(
      'PanelNavigation__spaceBetween'
    )[0].clientWidth
  );

  useEffect(() => {
    const initiallySelectedTabIndexRecord = panelItemProps.reduce(
      (prev, curr, index) => {
        if (curr.__type === 'PanelTabs') {
          return {
            ...prev,
            [index]: curr.initiallySelectedTabIndex,
          };
        }

        return prev;
      },
      {} as Record<number, number>
    );

    setSelectedTabIndexRecord(initiallySelectedTabIndexRecord);
  }, []);

  useEffect(() => {
    const panelNameRecord = panelItemProps.reduce((prev, curr, index) => {
      if (['PanelItem', 'PanelTabs'].includes(curr.__type)) {
        return {
          ...prev,
          [index]: curr.name,
        };
      }
    }, {} as Record<number, string>);

    setPanelNameRecord(panelNameRecord);
  }, []);

  useEffect(() => {
    const dynamicClasses =
      typeof initialClasses === 'function'
        ? initialClasses({
            selectedPanelName: panelNameRecord[selectedPanelIndex],
          })
        : initialClasses;

    setClasses(dynamicClasses);
  }, [panelNameRecord, selectedPanelIndex]);

  return (
    <div
      className={clsx(
        styles['Panel'],
        styles[`Panel--${type}`],
        classes?.container,
        className
      )}
    >
      <PanelContext.Provider
        value={{
          classes,
          selectedPanelIndex,
          selectedTabIndexRecord,
          setSelectedPanelIndex,
          setSelectedTabIndexRecord,
        }}
      >
        {panelItemPropsWhereHasNavigationItem.length && (
          <PanelNavigation ref={navigationRef}>
            {panelItemProps.map((panelItem, index) => {
              const isPanelSelected = index === selectedPanelIndex;
              const panelItemClasses =
                typeof panelItem.classes === 'function'
                  ? panelItem.classes({ isPanelSelected })
                  : panelItem.classes;

              return panelItem.navigationItem ? (
                <PanelNavigationItem
                  className={clsx(panelItemClasses?.navigationItem)}
                  isPanelSelected={isPanelSelected}
                  key={index}
                  panelIndex={index}
                >
                  {panelItem.navigationItem({ isPanelSelected })}
                </PanelNavigationItem>
              ) : null;
            })}
          </PanelNavigation>
        )}
        <div
          className={clsx(
            styles['Panel__items'],
            styles[`Panel__items--${type}`]
          )}
        >
          {type === PanelType.PLAIN ? (
            panelItems[selectedPanelIndex]
          ) : type === PanelType.CAROUSEL ? (
            spaceBetween ? (
              <PanelCarousel spaceBetween={spaceBetween}>
                {panelItems}
              </PanelCarousel>
            ) : null
          ) : null}
        </div>
      </PanelContext.Provider>
    </div>
  );
};

Panel.Item = PanelItem;
Panel.Tabs = PanelTabs;
Panel.Tab = PanelTab;

export default Panel;
