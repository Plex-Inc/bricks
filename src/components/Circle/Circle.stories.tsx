import type { Meta, StoryObj } from '@storybook/react';

import { Circle } from './Circle';

const meta: Meta<typeof Circle> = {
    title: 'Example/Circle',
    component: Circle,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BaseCircle: Story = {
    args: {
        size: 'xxl',
        str: 'KING IVAN',
    },
    argTypes: {
        size: {
            options: ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxl', 'large'],
            control: {
                type: 'radio',
            },
        },
    },
};
