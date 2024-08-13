import React, { InputHTMLAttributes, MutableRefObject, forwardRef } from 'react';
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

interface VerificationInputBox {
    children: React.ReactNode;
    className?: string;
    label?: string;
}

export const VerificationInput = forwardRef<HTMLInputElement, VerificationInputProps>(
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

export const VerificationBox: React.FC<React.PropsWithChildren<VerificationInputBox>> = ({
    children,
    className,
    label,
}) => {
    return (
        <div className={cn(s.Wrapper, className)}>
            {nullable(label, (t) => (
                <span className={s.Label}>{t}</span>
            ))}
            <div className={s.InputWrapper}>{children}</div>
        </div>
    );
};
