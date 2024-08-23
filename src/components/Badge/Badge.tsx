import React, { forwardRef } from 'react';
import cn from 'classnames';

import { nullable } from '../../utils';

import styles from './Badge.module.css';

const viewMap = {
    info: styles.Badge_info,
    success: styles.Badge_success,
    warning: styles.Badge_warning,
    danger: styles.Badge_danger,
    brand: styles.Badge_brand,
    base: styles.Badge_base,
};

const sizeMap = {
    xs: styles.Badge_size_xs,
    s: styles.Badge_size_s,
    m: styles.Badge_size_m,
    l: styles.Badge_size_l,
};

interface BadgeProps {
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    size?: keyof typeof sizeMap;
    view?: keyof typeof viewMap;
    className?: string;
    children: React.ReactNode;
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
    ({ size = 's', view = 'info', leftIcon, rightIcon, children, className, ...props }, ref) => {
        return (
            <div ref={ref} className={cn(styles.Badge, sizeMap[size], viewMap[view], className)} {...props}>
                {nullable(leftIcon, (icon) => (
                    <>{icon}</>
                ))}
                {children}
                {nullable(rightIcon, (icon) => (
                    <>{icon}</>
                ))}
            </div>
        );
    },
);
