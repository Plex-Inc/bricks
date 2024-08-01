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
        size: 12,
        str: 'KING IVAN',
    },
    argTypes: {},
};
