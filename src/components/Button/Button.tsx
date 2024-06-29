import React, { HTMLAttributes } from 'react';
import cn from 'classnames';

import s from './Button.module.css';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {}

export const Button = ({ children, className, ...rest }: ButtonProps) => {
    return (
        <button className={cn(s.button, className)} {...rest}>
            {children}
        </button>
    );
};
