import React, { HTMLAttributes } from 'react';
import cn from 'classnames';

import s from './StatusBadge.module.css';

export const sizeMap = {
    s: s.StatusBadge_s,
    m: s.StatusBadge_m,
};

export const viewMap = {
    ghost: s.StatusBadge_ghost,
    info: s.StatusBadge_info,
    warn: s.StatusBadge_warn,
    danger: s.StatusBadge_danger,
    positive: s.StatusBadge_positive,
    brand: s.StatusBadge_brand,
};

interface StatusBadgeProps extends HTMLAttributes<HTMLDivElement> {
    size: keyof typeof sizeMap;
    view: keyof typeof viewMap;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ size, view, className, ...rest }) => {
    return <div className={cn(s.StatusBadge, viewMap[view], sizeMap[size], className)} {...rest}></div>;
};
