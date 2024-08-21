import type { Meta, StoryObj } from '@storybook/react';

import { StatusBadge } from './StatusBadge';

const meta: Meta<typeof StatusBadge> = {
    title: 'Example/StatusBadge',
    component: StatusBadge,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BaseStatusBadge: Story = {
    args: {
        size: 's',
        view: 'brand',
    },
    argTypes: {
        size: {
            options: ['s', 'm'],
            control: {
                type: 'radio',
            },
        },
        view: {
            options: ['ghost', 'warn', 'info', 'danger', 'brand', 'positive'],
            control: {
                type: 'radio',
            },
        },
    },
};
