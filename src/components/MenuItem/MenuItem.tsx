import React, { HTMLAttributes } from 'react';
import cn from 'classnames';

import s from './MenuItem.module.css';

interface MenuItemProps extends HTMLAttributes<HTMLDivElement> {
    disabled?: boolean;
}

export const MenuItem = ({ children, className, disabled, ...props }: MenuItemProps) => {
    return (
        <div className={cn(s.MenuItem, { [s.MenuItem_disabled]: disabled }, className)} {...props}>
            {children}
        </div>
    );
};
