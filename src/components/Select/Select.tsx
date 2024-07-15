import React, { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';

import s from './Select.module.css';

const sizeMap = {
    s: s.Select_size_s,
    m: s.Select_size_m,
};

interface SelectProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    icon?: ReactNode;
    placeholder?: string;
    error?: boolean;
    size?: keyof typeof sizeMap;
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>(() => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button>{}</button>
        </div>
    );
});
