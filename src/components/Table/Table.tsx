import React, { HTMLAttributes, useMemo } from 'react';
import cn from 'classnames';

import style from './Table.module.css';

interface Table extends HTMLAttributes<HTMLDivElement> {}

interface TableHead extends HTMLAttributes<HTMLDivElement> {}

interface TableCell extends HTMLAttributes<HTMLDivElement> {
    width?: number | string;
}

interface TableRow extends HTMLAttributes<HTMLDivElement> {}

export const Table = ({ className, children, ...rest }: Table) => {
    return (
        <div className={cn(className, style.Table)} {...rest}>
            {children}
        </div>
    );
};

export const TableHead = ({ className, children, ...rest }: TableHead) => {
    return (
        <div className={cn(className, style.HeadRow)} {...rest}>
            {children}
        </div>
    );
};

export const TableRow = ({ className, children, ...rest }: TableRow) => {
    return (
        <div className={cn(style.Row, className)} {...rest}>
            {children}
        </div>
    );
};

export const TableCell = ({ className, width, children, ...rest }: TableCell) => {
    const styles = useMemo(() => {
        if (typeof width === 'string') {
            return { width };
        }
        return { width: `${width}px` };
    }, [width]);

    return (
        <div className={cn(className)} style={styles} {...rest}>
            {children}
        </div>
    );
};
