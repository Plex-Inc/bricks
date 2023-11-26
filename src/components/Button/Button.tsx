import React, { FC, HTMLAttributes } from 'react';
import cn from 'classnames';

import s from './Button.module.css';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {}

const Button: FC<ButtonProps> = ({ children, className, ...rest }) => {
    return (
        <button className={cn(s.button, s['bg-green-box'], className)} {...rest}>
            {children}
        </button>
    );
};

export default Button;
