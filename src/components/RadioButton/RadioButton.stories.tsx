import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { RadioButton as RadioButtonComponent } from './RadioButton';

const meta: Meta<typeof RadioButtonComponent> = {
    title: 'Example/Radiobutton',
    component: RadioButtonComponent,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const RadioButton: Story = {
    args: {
        checked: true,
        label: '',
    },
    argTypes: {
        checked: {
            options: [true, false],
            control: {
                type: 'radio',
            },
        },
        positionText: {
            options: ['left', 'right'],
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
    },
};

const Labeled = () => {
    const [checked, setChecked] = useState('1');
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <RadioButtonComponent
                label="text me"
                textSize="l"
                positionText="right"
                as="span"
                value={'1'}
                onChange={(e) => setChecked(e.target.value)}
                checked={checked === '1'}
                size="l"
            />
            <RadioButtonComponent
                label="text me"
                textSize="m"
                positionText="right"
                as="span"
                value={'2'}
                onChange={(e) => setChecked(e.target.value)}
                checked={checked === '2'}
                size="m"
            />
            <RadioButtonComponent
                label="disabled"
                textSize="l"
                positionText="right"
                as="span"
                disabled
                checked={true}
                size="l"
            />
            <RadioButtonComponent
                label="disabled"
                textSize="l"
                positionText="right"
                as="span"
                disabled
                checked={false}
                size="l"
            />
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
            <RadioButtonComponent checked disabled size="l" />
            <RadioButtonComponent disabled size="l" />
        </div>
    );
};

export { Labeled, Disabled };
