import type { Meta, StoryObj } from '@storybook/react';

import { User } from './User';

const meta: Meta<typeof User> = {
    title: 'Example/User',
    component: User,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const UserDefault: Story = {
    args: {
        size: 'l',
        nickname: 'KING MAX',
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
