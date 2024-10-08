import type { Meta, StoryObj } from '@storybook/react';

import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
    title: 'Example/Skeleton',
    component: Skeleton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BaseLoader: Story = {
    args: {
        height: '72px',
        width: '200px',
    },
};
