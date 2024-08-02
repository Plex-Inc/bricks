import React, { HTMLAttributes, useMemo } from 'react';
import cn from 'classnames';

import { isColorDark, stringToColor } from '../../utils/stringToColor';

import s from './Circle.module.css';

const sizeMap = {
    xxs: s.Circle_xxs,
    xs: s.Circle_xs,
    s: s.Circle_s,
    m: s.Circle_m,
    l: s.Circle_l,
    xl: s.Circle_xl,
    xxl: s.Circle_xxl,
    xxxl: s.Circle_xxxl,
    large: s.Circle_large,
};

interface CircleProps extends HTMLAttributes<HTMLDivElement> {
    size: keyof typeof sizeMap;
    str: string;
}
export const Circle: React.FC<CircleProps> = ({ size, str, className, children, ...rest }) => {
    const mainColor = stringToColor(str);
    const styles: Record<string, unknown> = useMemo(() => {
        return {
            background: `${mainColor}`,
            color: `${isColorDark(mainColor) ? 'white' : 'black'}`,
        };
    }, [str]);
    return (
        <div className={cn(s.Circle, sizeMap[size], className)} style={styles} {...rest}>
            {children}
        </div>
    );
};
