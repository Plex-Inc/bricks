import type { Meta, StoryObj } from '@storybook/react';

import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
    title: 'Example/Divider',
    component: Divider,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        text: 'Text',
        size: 's',
    },
    argTypes: {
        size: {
            options: ['s', 'm', 'l'],
            control: {
                type: 'radio',
            },
        },
        position: {
            options: ['left', 'right', 'center'],
            control: {
                type: 'radio',
            },
        },
        as: {
            options: ['div', 'span', 'p', 'label', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
            control: {
                type: 'radio',
            },
        },
    },
};
