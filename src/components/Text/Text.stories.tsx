import type { Meta, StoryObj } from '@storybook/react';

import { Text } from './Text';

const meta: Meta<typeof Text> = {
    title: 'Example/Text',
    component: Text,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TextStory: Story = {
    args: {
        size: 's',
        children: 'Text me',
    },
    argTypes: {
        size: {
            options: ['xs', 's', 'm', 'l'],
            control: {
                type: 'radio',
            },
        },
        strong: {
            options: [true, false],
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
