import type { Meta, StoryObj } from '@storybook/react';
import React, { ComponentProps } from 'react';

import { Input } from './Input';

const meta: Meta<typeof Input> = {
    title: 'Example/Input',
    component: Input,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BaseInput: Story = {
    args: {
        placeholder: 'Search or jump to...',
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
        size: {
            options: ['s', 'm', 'l'],
            control: {
                type: 'radio',
            },
        },
    },
};

const svgSearch = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.4668 19.4667L15.2001 15.2M10.9334 17.3333C7.39882 17.3333 4.53345 14.4679 4.53345 10.9333C4.53345 7.3987 7.39882 4.53333 10.9334 4.53333C14.4681 4.53333 17.3334 7.3987 17.3334 10.9333C17.3334 14.4679 14.4681 17.3333 10.9334 17.3333Z" />
    </svg>
);

const InputDefault = ({ placeholder = 'Search or jump to...', ...rest }: ComponentProps<typeof Input>) => (
    <div
        style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
        }}
    >
        <Input placeholder={placeholder} variant="layer" view="default" size="l" {...rest} />
        <Input placeholder={placeholder} variant="layer" view="default" size="l" iconLeft={svgSearch} {...rest} />
    </div>
);

const InputSuccess = ({ placeholder = 'Search or jump to...', ...rest }: ComponentProps<typeof Input>) => (
    <div
        style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
        }}
    >
        <Input placeholder={placeholder} variant="layer" view="success" size="l" {...rest} />
        <Input placeholder={placeholder} variant="layer" view="success" size="l" iconLeft={svgSearch} {...rest} />
    </div>
);

const InputError = ({ placeholder = 'Search or jump to...', ...rest }: ComponentProps<typeof Input>) => (
    <div
        style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
        }}
    >
        <Input placeholder={placeholder} variant="layer" view="error" size="l" {...rest} />
        <Input placeholder={placeholder} variant="layer" view="error" size="l" iconLeft={svgSearch} {...rest} />
    </div>
);

export { InputDefault, InputSuccess, InputError };
