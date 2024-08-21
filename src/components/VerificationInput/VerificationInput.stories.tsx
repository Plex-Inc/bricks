import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { VerificationInput } from './VerificationInput';

const meta: Meta<typeof VerificationInput> = {
    title: 'Example/VerificationInput',
    component: VerificationInput,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        placeholder: '4',
        size: 's',
        view: 'default',
    },
    argTypes: {
        size: {
            options: ['s', 'm', 'l'],
            control: {
                type: 'radio',
            },
        },
        view: {
            options: ['default', 'success', 'error'],
            control: {
                type: 'radio',
            },
        },
    },
};

const DefaultVerificationInput = () => {
    const [, setSecret] = useState('');
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <VerificationInput onChange={setSecret} />
        </div>
    );
};

const ViewVerificationInput = () => {
    const [errorSecret, setErrorSecret] = useState('');
    const [successSecret, setSuccessSecret] = useState('');

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <VerificationInput view="error" onChange={setErrorSecret} value={errorSecret} />
            <VerificationInput view="success" onChange={setSuccessSecret} value={successSecret} />
        </div>
    );
};

export { DefaultVerificationInput, ViewVerificationInput };
