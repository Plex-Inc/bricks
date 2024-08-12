import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { Checkbox as CheckboxComponent } from './Checkbox';

const meta: Meta<typeof CheckboxComponent> = {
    title: 'Example/Checkbox',
    component: CheckboxComponent,
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
        label: '',
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
            <CheckboxComponent
                onChange={(e) => setIsChecked(e.target.checked)}
                positionText="right"
                as="span"
                label={'text me'}
                checked={isChecked}
                size="l"
            />
            <CheckboxComponent
                onChange={(e) => setIsNotChecked(e.target.checked)}
                positionText="right"
                as="span"
                label={'text me'}
                checked={isNotChecked}
                textSize="m"
                size="m"
            />
            <CheckboxComponent positionText="right" as="span" disabled label={'text me'} checked size="l" />
            <CheckboxComponent positionText="right" as="span" disabled label={'text me'} checked={false} size="l" />
        </div>
    );
};

const Disabled = () => {
    return (
        <div
            style={{
                display: 'flex',
                gap: '24px',
            }}
        >
            <CheckboxComponent checked disabled size="l" />
            <CheckboxComponent disabled size="l" />
        </div>
    );
};

export { Labeled, Disabled };
