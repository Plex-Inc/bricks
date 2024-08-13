import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
    title: 'Example/Switch',
    component: Switch,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const CheckboxDefault: Story = {
    args: {
        checked: true,
        positionText: 'right',
        label: 'dedede',
    },
    argTypes: {
        checked: {
            options: [true, false],
            control: {
                type: 'radio',
            },
        },
        size: {
            options: ['m', 'l'],
            control: {
                type: 'radio',
            },
        },
        positionText: {
            options: ['right', 'left'],
            control: {
                type: 'radio',
            },
        },
    },
};

const Labeled = () => {
    const [isChecked, setIsChecked] = useState(true);
    const [isNotChecked, setIsNotChecked] = useState(false);
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Switch
                size="l"
                as="span"
                label="Switch"
                checked={isChecked}
                positionText="right"
                onChange={(e) => setIsChecked(e.target.checked)}
            />
            <Switch
                size="l"
                as="span"
                label="Switch"
                checked={isNotChecked}
                positionText="right"
                onChange={(e) => setIsNotChecked(e.target.checked)}
            />
        </div>
    );
};

const Disabled = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Switch size="l" disabled as="span" label="Switch" checked={true} positionText="right" />
            <Switch size="m" disabled as="span" label="Switch" checked={true} positionText="right" />
        </div>
    );
};

export { Labeled, Disabled };
