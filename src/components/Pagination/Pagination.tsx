import React, { HTMLAttributes, useCallback } from 'react';
import { LeftStroke, RightStroke } from '@plex-inc/icons';
import cn from 'classnames';

import { PaginationData, usePagination } from '../../hooks/usePagination';

import s from './Pagination.module.css';

const sizeMap: Record<string, unknown> = {
    s: s.Pagination_size_s,
    m: s.Pagination_size_m,
    l: s.Pagination_size_l,
};

interface PaginationProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>, PaginationData {
    onChange: (value: number) => void;
    disabled?: boolean;
    size?: keyof typeof sizeMap;
}

export const Pagination: React.FC<PaginationProps> = ({
    onChange,
    totalCount,
    currentPage,
    disabled,
    className,
    siblingCount = 1,
    size = 'm',
}) => {
    const paginationRange = usePagination({
        totalCount,
        currentPage,
        siblingCount,
    });
    const handlePrev = () => {
        onChange(currentPage - 1);
    };
    const handleNext = () => {
        onChange(currentPage + 1);
    };
    const handlePageChange = useCallback(
        (value: number | string) => {
            if (typeof value !== 'number') return;
            onChange(value);
        },
        [onChange],
    );
    return (
        <div className={cn(s.Pagination, sizeMap[size], className)}>
            <button disabled={currentPage === 1 || disabled} onClick={handlePrev} className={s.PaginationItem}>
                <LeftStroke size={16} color="var(--icons-brand)" />
            </button>
            {paginationRange.map((item, i) => {
                return (
                    <button
                        onClick={() => handlePageChange(item)}
                        className={cn(s.PaginationItem, { [s.PaginationItem_active]: item === currentPage })}
                        key={`${item} ${i}`}
                        disabled={disabled}
                    >
                        {item}
                    </button>
                );
            })}
            <button disabled={currentPage === totalCount || disabled} onClick={handleNext} className={s.PaginationItem}>
                <RightStroke size={16} color="var(--icons-brand)" />
            </button>
        </div>
    );
};
