import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Timer } from './Timer';

const meta: Meta<typeof Timer> = {
    title: 'Example/Timer',
    component: Timer,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        view: 'default',
        size: 'm',
        initialTime: '00:30',
    },
    argTypes: {
        view: {
            options: ['default', 'success', 'error'],
            control: {
                type: 'radio',
            },
        },
        size: {
            options: ['s', 'm', 'l', 'xl'],
            control: {
                type: 'radio',
            },
        },
    },
};

export const DefaultTimer = () => {
    const expireDate = new Date();
    expireDate.setSeconds(expireDate.getSeconds() + 30);
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
            }}
        >
            <Timer expireDate={expireDate} createDate={new Date()} initialTime="00:30" view={'default'} size={'xl'} />
        </div>
    );
};
