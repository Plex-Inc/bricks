import React, { HTMLAttributes, useMemo } from 'react';
import cn from 'classnames';

import { Text } from '../Text/Text';
import { nullable } from '../../utils';

import s from './Loader.module.css';

const sizeMap = {
    xs: s.Loader_size_xs,
    s: s.Loader_size_s,
    m: s.Loader_size_m,
};
interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
    value: number;
    size: keyof typeof sizeMap;
    placeholder?: string;
}
export const Loader: React.FC<LoaderProps> = ({ size = 's', value, placeholder, className, ...rest }) => {
    const styles: Record<string, unknown> = useMemo(() => {
        let val = value;

        if (val > 100) val = 100;
        if (val < 0) val = 0;

        return {
            '--loader-completed-width': `${val}%`,
        };
    }, [value]);

    return (
        <div className={cn(s.Loader, className)}>
            <div
                data-completed={`${value}%`}
                style={styles}
                className={cn(s.LoaderInner, sizeMap[size])}
                {...rest}
            ></div>
            {nullable(size === 'm' && placeholder, () => (
                <Text size="text_s" className={cn(s.LoaderPlaceholder)}>
                    {placeholder}
                </Text>
            ))}
        </div>
    );
};
