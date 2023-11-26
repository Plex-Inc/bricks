import React, { HTMLAttributes, ReactNode } from 'react';
import cn from 'classnames';

import Badge from '../Badge/Badge';
import { nullable } from '../../utils';

import s from './Badges.module.css';

interface BadgesProps<T> extends HTMLAttributes<HTMLDivElement> {
    items: T[];
    renderItem?: (item: T) => ReactNode;
}

const Badges = <T extends { title?: string | null }>({
    items,
    renderItem = ({ title }) =>
        nullable(title, (t) => (
            <Badge key={t} title={t}>
                {t}
            </Badge>
        )),
    children,
    className,
    ...rest
}: BadgesProps<T>) => {
    return (
        <div className={cn(s.badges, className)} {...rest}>
            {children}
            {items.map(renderItem)}
        </div>
    );
};

export default Badges;
