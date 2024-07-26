import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect, useState } from 'react';

import { Button } from '../Button/Button';

import { VerificationBox, VerificationInput } from './VerificationInput';

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
    const [length] = useState<number>(6);
    const [secret, setSecret] = useState('');
    const arrayString = Array(length).fill('');
    const [code, setCode] = useState<string[]>(arrayString);

    const handleChange = (index: number, value: string) => {
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value.length === 1) {
            const nextIndex = Math.min(index + 1, length - 1);
            const inputElement = document.getElementById(`totp-input-${nextIndex}`);
            if (inputElement) {
                inputElement.focus();
            }
        }
        if (!value.length) {
            const backIndex = Math.min(index - 1, length - 1);
            const inputElement = document.getElementById(`totp-input-${backIndex}`);
            if (inputElement) {
                inputElement.focus();
            }
        }
    };

    useEffect(() => {
        const inputElement = document.getElementById(`totp-input-${0}`);
        inputElement?.focus();
    }, []);

    const handleVerify = () => {
        const combinedCode = code.join('');
        setSecret(combinedCode);
        setCode(arrayString);
    };

    console.log('secret', secret);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <VerificationBox>
                {code.map((obj, index) => {
                    return (
                        <>
                            <VerificationInput
                                key={index}
                                size="s"
                                type="text"
                                view="default"
                                placeholder=""
                                value={obj}
                                onChange={(e) => handleChange(index, e.target.value)}
                                maxLength={1}
                                inputMode="numeric"
                                id={`totp-input-${index}`}
                            />
                        </>
                    );
                })}
            </VerificationBox>
            <Button onClick={handleVerify} text="click me" variant="primary" view="positive" size="m" />
        </div>
    );
};

const ViewVerificationInput = () => {
    const [length] = useState<number>(6);
    const [secret, setSecret] = useState('');
    const arrayString = Array(length).fill('');
    const [code, setCode] = useState<string[]>(['4', '1', '6', '2', '6', '9']);
    const [codeError, setCodeError] = useState<string[]>(['4', '1', '6', '2', '6', '9']);

    const handleChange = (index: number, value: string) => {
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value.length === 1) {
            const nextIndex = Math.min(index + 1, length - 1);
            const inputElement = document.getElementById(`totp-input-${nextIndex}`);
            if (inputElement) {
                inputElement.focus();
            }
        }
        if (!value.length) {
            const backIndex = Math.min(index - 1, length - 1);
            const inputElement = document.getElementById(`totp-input-${backIndex}`);
            if (inputElement) {
                inputElement.focus();
            }
        }
    };

    const handleChangeError = (index: number, value: string) => {
        const newCode = [...codeError];
        newCode[index] = value;
        setCodeError(newCode);

        if (value.length === 1) {
            const nextIndex = Math.min(index + 1, length - 1);
            const inputElement = document.getElementById(`totp-input-erorr-${nextIndex}`);
            if (inputElement) {
                inputElement.focus();
            }
        }
        if (!value.length) {
            const backIndex = Math.min(index - 1, length - 1);
            const inputElement = document.getElementById(`totp-input-erorr-${backIndex}`);
            if (inputElement) {
                inputElement.focus();
            }
        }
    };

    const handleVerify = () => {
        const combinedCode = code.join('');
        setSecret(combinedCode);
        setCode(arrayString);
        setCodeError(arrayString);
    };

    console.log('secret', secret);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <VerificationBox>
                {codeError.map((obj, index) => {
                    return (
                        <>
                            <VerificationInput
                                key={index}
                                size="s"
                                type="text"
                                view="error"
                                value={obj}
                                onChange={(e) => handleChangeError(index, e.target.value)}
                                maxLength={1}
                                inputMode="numeric"
                                id={`totp-input-erorr-${index}`}
                            />
                        </>
                    );
                })}
            </VerificationBox>
            <VerificationBox>
                {code.map((obj, index) => {
                    return (
                        <>
                            <VerificationInput
                                key={index}
                                className=""
                                size="s"
                                type="text"
                                view="success"
                                value={obj}
                                onChange={(e) => handleChange(index, e.target.value)}
                                maxLength={1}
                                inputMode="numeric"
                                id={`totp-input-${index}`}
                            />
                        </>
                    );
                })}
            </VerificationBox>
            <Button onClick={handleVerify} text="click me" variant="primary" view="positive" size="m" />
        </div>
    );
};

export { DefaultVerificationInput, ViewVerificationInput };
