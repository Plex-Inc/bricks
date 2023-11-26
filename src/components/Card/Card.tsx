import React, { FC, HTMLAttributes } from 'react';
import cn from 'classnames';

import s from './Card.module.css';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    hue?: 'bg-green-box' | 'bg-white-box' | 'bg-yellow-box' | 'bg-blue-box';
}

export const Card: FC<CardProps> = ({ children, hue = 'bg-green-box', className, ...rest }) => {
    return (
        <div className={cn(s.card, s[hue], className)} {...rest}>
            {children}
        </div>
    );
};
