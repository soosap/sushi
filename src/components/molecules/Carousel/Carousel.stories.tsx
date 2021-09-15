import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CaretLeftIcon from 'icons/caret-left.svg';
import CaretRightIcon from 'icons/caret-right.svg';
import Icon from 'atoms/Icon';
import Carousel from './Carousel';

export default {
  title: 'molecules/Carousel',
  component: Carousel,
} as ComponentMeta<typeof Carousel>;

const Template: ComponentStory<typeof Carousel> = (args) => (
  <Carousel
    arrowLeft={() => <Icon svg={CaretLeftIcon} />}
    arrowRight={() => <Icon svg={CaretRightIcon} />}
    {...args}
  >
    hello
  </Carousel>
);

export const Primary = Template.bind({});
Primary.args = {};
