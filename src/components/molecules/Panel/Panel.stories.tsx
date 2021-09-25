import React from 'react';
import clsx from 'clsx';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Panel, { PanelType } from '../Panel';
import styles from './Panel.module.scss';

export default {
  title: 'molecules/Panel',
  component: Panel,
} as ComponentMeta<typeof Panel>;

// const PanelWithTabsTemplate: ComponentStory<typeof Panel> = (args) => {
//   return (
//     <Panel {...args}>
//       <Panel.Tab label={({ selected }) => <div>Panel Label 1: {selected}</div>}>
//         Hi there 1
//       </Panel.Tab>
//       <Panel.Tab label={({ selected }) => <div>Panel Label 2: {selected}</div>}>
//         Hi there 2
//       </Panel.Tab>
//     </Panel>
//   );
// };

// export const Tabs = PanelWithTabsTemplate.bind({});
// PanelWithTabsTemplate.args = {
//   type: PanelType.PLAIN,
// };

const PanelWithCarouselTemplate: ComponentStory<typeof Panel> = (args) => {
  return (
    <Panel
      {...args}
      classes={({ selectedPanelName }) => ({
        container: clsx(
          styles['MyPanel__container'],
          styles[`MyPanel__container--${selectedPanelName}`]
        ),
        navigation: styles['MyPanel__navigation'],
      })}
    >
      <Panel.Tabs
        name="firstPanel"
        activeClassName={styles['MyPanel__firstPanel--active']}
        className={styles['MyPanel__firstPanel']}
        classes={({ isPanelSelected }) => ({
          navigationItem: isPanelSelected && styles['MyPanel__firstPanel'],
          tab: styles['MyPanel__firstPanelTab'],
        })}
        navigationItem={({ isPanelSelected }) => (
          <div>First Panel: {isPanelSelected}</div>
        )}
      >
        <Panel.Tab
          name="firstPanelFirstTab"
          label={({ isTabSelected }) => <div>First Label: {isTabSelected}</div>}
        >
          First Panel | First Tab
        </Panel.Tab>
        <Panel.Tab
          name="firstPanelSecondTab"
          label={({ isTabSelected }) => (
            <div>Second Label: {isTabSelected}</div>
          )}
        >
          First Panel | Second Tab
        </Panel.Tab>
      </Panel.Tabs>

      <Panel.Tabs name="secondPanel">
        <Panel.Tab
          name="secondPanelFirstTab"
          label={({ isTabSelected }) => (
            <div>Panel Label 3: {isTabSelected}</div>
          )}
        >
          Second Panel | First Tab
        </Panel.Tab>
        <Panel.Tab
          name="secondPanelSecondTab"
          label={({ isTabSelected }) => (
            <div>Panel Label 4: {isTabSelected}</div>
          )}
        >
          Second Panel | Second Tab
        </Panel.Tab>
      </Panel.Tabs>

      <Panel.Item
        name="thirdPanel"
        classes={({ isPanelSelected }) => ({
          navigationItem: isPanelSelected && styles['MyPanel__thirdPanel'],
          tab: styles['MyPanel__thirdPanelTab'],
        })}
        navigationItem={({ isPanelSelected }) => (
          <div>Item B: {isPanelSelected}</div>
        )}
      >
        Third Panel
      </Panel.Item>
    </Panel>
  );
};

export const Carousel = PanelWithCarouselTemplate.bind({});
PanelWithCarouselTemplate.args = {
  type: PanelType.CAROUSEL,
};
