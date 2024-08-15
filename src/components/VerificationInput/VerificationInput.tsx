import React, { InputHTMLAttributes, MutableRefObject, forwardRef, useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import { nullable } from '../../utils';

import s from './VerificationInput.module.css';

const viewMap = {
    default: s.DefaultInput,
    error: s.ErrorInput,
    success: s.SuccessInput,
};

const sizeMap = {
    s: s.Input_size_s,
    m: s.Input_size_m,
    l: s.Input_size_l,
};

interface VerificationInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    forwardedRef?: MutableRefObject<HTMLDivElement | null>;
    className?: string;
    id?: string;
    placeholder?: string;
    type?: string;
    view?: keyof typeof viewMap;
    size?: keyof typeof sizeMap;
}

interface VerificationInputBox extends Omit<VerificationInputProps, 'onChange'> {
    className?: string;
    label?: string;
    length?: number;
    onChange: (value: string) => void;
}

export const Input = forwardRef<HTMLInputElement, VerificationInputProps>(
    ({ className, id, type, view = 'default', size = 's', placeholder, forwardedRef, ...rest }) => {
        return (
            <div ref={forwardedRef}>
                <input
                    type={type}
                    className={cn(s.VerificationInput, viewMap[view], sizeMap[size], className)}
                    id={id}
                    placeholder={placeholder}
                    {...rest}
                />
            </div>
        );
    },
);

export const VerificationInput: React.FC<React.PropsWithChildren<VerificationInputBox>> = ({
    className,
    label,
    length = 6,
    onChange,
    type = 'text',
    view = 'default',
    size = 's',
}) => {
    const boxRef = useRef<HTMLDivElement | null>(null);
    const arrayString = Array(length).fill('');
    const [code, setCode] = useState<string[]>(arrayString);

    const handleChange = (index: number, value: string) => {
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value.length === 1) {
            const nextIndex = Math.min(index + 1, length - 1);
            const inputElement = boxRef.current?.querySelector(`#totp-input-${nextIndex}`);
            if (inputElement instanceof HTMLInputElement) {
                inputElement.focus();
            }
        }
        if (!value.length) {
            const backIndex = Math.min(index - 1, length - 1);
            const inputElement = boxRef.current?.querySelector(`#totp-input-${backIndex}`);
            if (inputElement instanceof HTMLInputElement) {
                inputElement.focus();
            }
        }

        onChange(newCode.join(''));
    };

    useEffect(() => {
        if (!boxRef.current) return;
        const inputElement = boxRef.current.querySelector(`#totp-input-${0}`);

        if (inputElement instanceof HTMLInputElement) {
            inputElement.focus();
        }
    }, []);

    return (
        <div className={cn(s.Wrapper, className)}>
            {nullable(label, (t) => (
                <span className={s.Label}>{t}</span>
            ))}
            <div className={s.InputWrapper} ref={boxRef}>
                {code.map((obj, i) => (
                    <Input
                        key={i}
                        size={size}
                        type={type}
                        view={view}
                        placeholder=""
                        value={obj}
                        onChange={(e) => handleChange(i, e.target.value)}
                        maxLength={1}
                        inputMode="numeric"
                        id={`totp-input-${i}`}
                    />
                ))}
            </div>
        </div>
    );
};
