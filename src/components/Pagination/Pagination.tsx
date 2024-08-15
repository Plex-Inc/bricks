import React, { HTMLAttributes, useCallback } from 'react';
import cn from 'classnames';

import { PaginationData, usePagination } from '../../hooks/usePagination';

import s from './Pagination.module.css';

// TODO: Замена иконок на иконки из либы
function LeftIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12.8 1.06667L5.33334 8L12.8 14.9333" stroke="#554AE2" strokeLinecap="square" />
        </svg>
    );
}

// TODO: Замена иконок на иконки из либы
function RightIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M5.33331 14.9333L12.8 8L5.33331 1.06667" stroke="#554AE2" strokeLinecap="square" />
        </svg>
    );
}

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
                <LeftIcon />
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
                <RightIcon />
            </button>
        </div>
    );
};
