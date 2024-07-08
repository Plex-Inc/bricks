import React, { HTMLAttributes } from 'react';
import classNamesssss from 'classnames';

import s from './Button.module.css';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {}

const GITHUB_OUTPUT = 'dsdsdsdsdsdsdsdsdsdsdsdsdsdsd';

export const Button = ({ children, className, ...rest }: ButtonProps) => {
    return (
        <button className={classNamesssss(s.button, className)} {...rest}>
            {children} {GITHUB_OUTPUT}
        </button>
    );
};
