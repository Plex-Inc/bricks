import React, { FC, ReactNode } from 'react';
import cn from 'classnames';

import s from './Card.module.css';

interface CardProps {
    children: ReactNode;
    hue?: 'bg-green-box' | 'bg-white-box' | 'bg-yellow-box' | 'bg-blue-box';
}

export const Card: FC<CardProps> = ({ children, hue = 'bg-green-box' }) => {
    return <div className={cn(s.card, s[hue])}>{children}</div>;
};
