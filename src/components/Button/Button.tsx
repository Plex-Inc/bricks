import React, { HTMLAttributes } from 'react';
import classNames from 'classnames';

import s from './Button.module.css';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {}

export const Button = ({ children, className, ...rest }: ButtonProps) => {
    return (
        <button className={classNames(s.button, className)} {...rest}>
            {children}
        </button>
    );
};
