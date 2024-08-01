import React, { HTMLAttributes, useMemo } from 'react';
import cn from 'classnames';

import { isColorDark, stringToColor } from '../../utils/stringToColor';

import s from './Circle.module.css';

interface CircleProps extends HTMLAttributes<HTMLDivElement> {
    size: number;
    str: string;
}
export const Circle: React.FC<CircleProps> = ({ size, str, className, children, ...rest }) => {
    const mainColor = stringToColor(str);
    const styles: Record<string, unknown> = useMemo(() => {
        return {
            width: `${size}px`,
            height: `${size}px`,
            background: `${mainColor}`,
            color: `${isColorDark(mainColor) ? 'white' : 'black'}`,
            fontSize: `calc(${size / 2}px - 2px)`,
        };
    }, [size, str]);
    return (
        <div className={cn(s.Circle, className)} style={styles} {...rest}>
            {children}
        </div>
    );
};
