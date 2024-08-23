import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
    title: 'Example/Badge',
    component: Badge,
    parameters: {
        layout: 'centered',
    },
    args: {
        children: <span>Badge</span>,
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        size: 'm',
        view: 'success',
    },
    argTypes: {
        view: {
            options: ['info', 'success', 'warning', 'danger', 'brand', 'base'],
            control: {
                type: 'radio',
            },
        },
        size: {
            options: ['xs', 's', 'm', 'l'],
            control: {
                type: 'radio',
            },
        },
    },
};

const BadgeSuccess = () => (
    <div
        style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
        }}
    >
        <Badge view="success" size="l">
            Badge
        </Badge>
    </div>
);

export { BadgeSuccess };
