import React, { HTMLAttributes, useMemo } from 'react';
import cn from 'classnames';

import s from './Spinner.module.css';

const sizeMap = {
    s: s.Spinner_size_s,
    m: s.Spinner_size_m,
    l: s.Spinner_size_l,
};

interface SpinnerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'size'> {
    animationDuration: number;
    size: keyof typeof sizeMap;
}
export const Spinner: React.FC<SpinnerProps> = ({ animationDuration = 2, size, className, ...rest }) => {
    const styles: Record<string, unknown> = useMemo(() => {
        return {
            '--spinner-animation-time': `${animationDuration}s`,
        };
    }, [size, animationDuration]);
    return (
        <div style={styles} className={cn(s.Spinner, className)}>
            <div className={cn(s.SpinnerInner, sizeMap[size])} {...rest}></div>
        </div>
    );
};
