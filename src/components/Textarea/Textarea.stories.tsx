import type { Meta, StoryObj } from '@storybook/react';
import React, { ComponentProps } from 'react';

import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
    title: 'Example/Textarea',
    component: Textarea,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        placeholder: 'Type text here',
        variant: 'background',
        view: 'default',
    },
    argTypes: {
        view: {
            options: ['default', 'success', 'error'],
            control: {
                type: 'radio',
            },
        },
        variant: {
            options: ['background', 'layer'],
            control: {
                type: 'radio',
            },
        },
    },
};

const Success = ({ placeholder = 'Type text here', ...rest }: ComponentProps<typeof Textarea>) => (
    <div
        style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
        }}
    >
        <Textarea placeholder={placeholder} variant="layer" view="success" {...rest} />
    </div>
);

const Error = ({ placeholder = 'Type text here', ...rest }: ComponentProps<typeof Textarea>) => (
    <div
        style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
        }}
    >
        <Textarea placeholder={placeholder} variant="layer" view="error" {...rest} />
    </div>
);

export { Success, Error };
