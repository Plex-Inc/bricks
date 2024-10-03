import React, { HTMLAttributes } from 'react';
import cn from 'classnames';

import s from './MenuItem.module.css';

const sizeMap = {
    s: s.MenuItem_size_s,
    m: s.MenuItem_size_m,
    l: s.MenuItem_size_l,
};
interface MenuItemProps extends HTMLAttributes<HTMLDivElement> {
    disabled?: boolean;
    active?: boolean;
    size?: keyof typeof sizeMap;
}

export const MenuItem = ({ children, active, size = 'l', className, disabled, ...props }: MenuItemProps) => {
    return (
        <div
            className={cn(
                s.MenuItem,
                sizeMap[size],
                { [s.MenuItem_disabled]: disabled },
                { [s.MenuItem_active]: active },
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
};
