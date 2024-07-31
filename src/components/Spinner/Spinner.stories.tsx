import type { Meta, StoryObj } from '@storybook/react';

import { Spinner } from './Spinner';

const meta: Meta<typeof Spinner> = {
    title: 'Example/Spinner',
    component: Spinner,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BaseSpinner: Story = {
    args: {
        animationDuration: 2,
        size: 'm',
    },
    argTypes: {
        size: {
            options: ['s', 'm', 'l'],
            control: {
                type: 'radio',
            },
        },
    },
};
