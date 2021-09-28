import React from 'react';
import clsx from 'clsx';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Panel, { PanelType } from '../Panel';
import styles from './Panel.module.scss';

export default {
  title: 'molecules/Panel',
  component: Panel,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: [PanelType.PLAIN, PanelType.CAROUSEL],
      },
    },
  },
} as ComponentMeta<typeof Panel>;

const Template: ComponentStory<typeof Panel> = (args) => (
  <Panel
    classes={({ selectedPanelName }) => ({
      container: clsx(
        styles['MyPanel__container'],
        styles[`MyPanel__container--${selectedPanelName}`]
      ),
      navigation: styles['MyPanel__navigation'],
    })}
    {...args}
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
        <div>First Panel: {isPanelSelected ? 'yes' : 'no'}</div>
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
        label={({ isTabSelected }) => <div>Second Label: {isTabSelected}</div>}
      >
        First Panel | Second Tab
      </Panel.Tab>
    </Panel.Tabs>

    <Panel.Tabs
      name="secondPanel"
      navigationItem={({ isPanelSelected }) => (
        <div>Second Panel: {isPanelSelected ? 'yes' : 'no'}</div>
      )}
    >
      <Panel.Tab
        name="secondPanelFirstTab"
        label={({ isTabSelected }) => <div>Panel Label 3: {isTabSelected}</div>}
      >
        Second Panel | First Tab
      </Panel.Tab>
      <Panel.Tab
        name="secondPanelSecondTab"
        label={({ isTabSelected }) => <div>Panel Label 4: {isTabSelected}</div>}
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
        <div>Third Panel: {isPanelSelected ? 'yes' : 'no'}</div>
      )}
    >
      Third Panel
    </Panel.Item>

    <Panel.Item
      name="fourthPanel"
      classes={({ isPanelSelected }) => ({
        navigationItem: isPanelSelected && styles['MyPanel__fourthPanel'],
        tab: styles['MyPanel__fourthPanelTab'],
      })}
    >
      Fourth Panel
    </Panel.Item>

    <Panel.Tabs
      name="fifthPanel"
      navigationItem={({ isPanelSelected }) => (
        <div>Fifth Panel: {isPanelSelected ? 'yes' : 'no'}</div>
      )}
    >
      <Panel.Tab
        name="fifthPanelFirstTab"
        label={({ isTabSelected }) => <div>Panel Label 3: {isTabSelected}</div>}
      >
        Fifth Panel | First Tab
      </Panel.Tab>
      <Panel.Tab
        name="fifthPanelSecondTab"
        label={({ isTabSelected }) => <div>Panel Label 4: {isTabSelected}</div>}
      >
        Fifth Panel | Second Tab
      </Panel.Tab>
    </Panel.Tabs>

    <Panel.Tabs
      name="sixthPanel"
      navigationItem={({ isPanelSelected }) => (
        <div>Sixth Panel: {isPanelSelected ? 'yes' : 'no'}</div>
      )}
    >
      <Panel.Tab
        name="sixthPanelFirstTab"
        label={({ isTabSelected }) => <div>Panel Label 3: {isTabSelected}</div>}
      >
        Sixth Panel | First Tab
      </Panel.Tab>
      <Panel.Tab
        name="sixthPanelSecondTab"
        label={({ isTabSelected }) => <div>Panel Label 4: {isTabSelected}</div>}
      >
        Sixth Panel | Second Tab
      </Panel.Tab>
    </Panel.Tabs>

    <Panel.Tabs
      name="seventhPanel"
      navigationItem={({ isPanelSelected }) => (
        <div>Seventh Panel: {isPanelSelected ? 'yes' : 'no'}</div>
      )}
    >
      <Panel.Tab
        name="seventhPanelFirstTab"
        label={({ isTabSelected }) => <div>Panel Label 3: {isTabSelected}</div>}
      >
        Seventh Panel | First Tab
      </Panel.Tab>
      <Panel.Tab
        name="seventhPanelSecondTab"
        label={({ isTabSelected }) => <div>Panel Label 4: {isTabSelected}</div>}
      >
        Seventh Panel | Second Tab
      </Panel.Tab>
    </Panel.Tabs>
  </Panel>
);

export const Carousel = Template.bind({});
Carousel.args = {
  type: PanelType.CAROUSEL,
};
