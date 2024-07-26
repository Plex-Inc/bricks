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

export const Divider = ({ text, position = 'center', size = 's', as = 'span', className }: DividerProps) => {
    return (
        <div
            className={cn(
                s.Wrapper,
                {
                    [s.Not_text]: !text,
                },
                className,
            )}
        >
            {nullable(position !== 'left', () => (
                <span className={s.Divider} />
            ))}
            {nullable(text, (t) => (
                <Text as={as} size={size} className={s.Text}>
                    {t}
                </Text>
            ))}
            {nullable(position !== 'right', () => (
                <span className={s.Divider} />
            ))}
        </div>
    );
};
