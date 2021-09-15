import React from 'react';
import Carousel, { Props } from './Carousel';

export default {
  title: 'molecules/Carousel',
  component: Carousel,
};

const Template = (args: Props) => <Carousel {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
