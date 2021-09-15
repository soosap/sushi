import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CaretLeftIcon from 'icons/caret-left.svg';
import CaretRightIcon from 'icons/caret-right.svg';
import Icon from 'atoms/Icon';
import Card from 'molecules/Card';
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
    <Card>
      <div>1 Lorem Ipsum</div>
      <div>1 Lorem Ipsum</div>
      <div>1 Lorem Ipsum</div>
      <div>1 Lorem Ipsum</div>
      <div>1 Lorem Ipsum</div>
      <div>1 Lorem Ipsum</div>
    </Card>
    <Card>
      <div>2 Lorem Ipsum</div>
      <div>2 Lorem Ipsum</div>
      <div>2 Lorem Ipsum</div>
      <div>2 Lorem Ipsum</div>
      <div>2 Lorem Ipsum</div>
      <div>2 Lorem Ipsum</div>
    </Card>
    <Card>
      <div>3 Lorem Ipsum</div>
      <div>3 Lorem Ipsum</div>
      <div>3 Lorem Ipsum</div>
      <div>3 Lorem Ipsum</div>
      <div>3 Lorem Ipsum</div>
      <div>3 Lorem Ipsum</div>
    </Card>
    <Card>
      <div>4 Lorem Ipsum</div>
      <div>4 Lorem Ipsum</div>
      <div>4 Lorem Ipsum</div>
      <div>4 Lorem Ipsum</div>
      <div>4 Lorem Ipsum</div>
      <div>4 Lorem Ipsum</div>
    </Card>
    <Card>
      <div>5 Lorem Ipsum</div>
      <div>5 Lorem Ipsum</div>
      <div>5 Lorem Ipsum</div>
      <div>5 Lorem Ipsum</div>
      <div>5 Lorem Ipsum</div>
      <div>5 Lorem Ipsum</div>
    </Card>
  </Carousel>
);

export const Primary = Template.bind({});
Primary.args = {
  slidesPerRow: 4,
  slidesToScroll: 1,
};
