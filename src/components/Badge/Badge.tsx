import cn from 'classnames';
import React, { FC, HTMLAttributes } from 'react';

import s from './Badge.module.css';

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {}

const Badge: FC<BadgeProps> = ({ className, children, ...rest }) => {
    return (
        <div className={cn(s.badge, className)} {...rest}>
            {children}
        </div>
    );
};

export default Badge;
