import React from 'react';
import cn from 'classnames';

import { nullable } from '../../utils';
import { Tags, Text } from '../Text/Text';

import s from './Divider.module.css';

interface DividerProps {
    className?: string;
    as?: keyof Tags;
    position?: 'left' | 'right' | 'center';
    size?: 's' | 'm' | 'l';
    text?: React.ReactNode;
}

const sizeDevider = {
    s: 'text_s',
    m: 'text_m',
    l: 'text_l',
} as const;

export const Divider = ({ text, position = 'center', size = 's', as = 'span', className }: DividerProps) => {
    return (
        <div
            className={cn(
                s.Wrapper,
                {
                    [s.WrapperThisText]: text,
                },
                className,
            )}
        >
            {nullable(position !== 'left', () => (
                <div className={s.Divider} />
            ))}
            {nullable(text, (t) => (
                <Text as={as} size={sizeDevider[size]} className={s.Text}>
                    {t}
                </Text>
            ))}
            {nullable(position !== 'right', () => (
                <div className={s.Divider} />
            ))}
        </div>
    );
};
