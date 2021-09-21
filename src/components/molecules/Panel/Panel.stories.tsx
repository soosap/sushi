import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Panel from './Panel';

export default {
  title: 'molecules/Panel',
  component: Panel,
} as ComponentMeta<typeof Panel>;

const Template: ComponentStory<typeof Panel> = (args) => {
  return <Panel {...args} />;
};

export const Primary = Template.bind({});
Primary.args = {};
