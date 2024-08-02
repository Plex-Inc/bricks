import type { Meta, StoryObj } from '@storybook/react';

import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
    title: 'Example/Avatar',
    component: Avatar,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BaseAvatar: Story = {
    args: {
        size: 'l',
        name: 'KING IVAN',
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
