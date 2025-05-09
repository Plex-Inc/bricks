import { useMemo } from 'react';

export interface PaginationData {
    /**
     * Общее количество страниц.
     */
    totalCount: number;
    /**
     * Количество соседних страниц, отображаемых рядом с текущей страницей.
     *
     * @defaultValue 1
     *
     */
    siblingCount?: number;
    /**
     * Текущий номер страницы.
     *
     * @remarks
     * Эта переменная определяет, какая страница активна на данный момент.
     */
    currentPage: number;
}

const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
};

export const DOTS = '...';

export const usePagination = ({ totalCount, siblingCount = 1, currentPage }: PaginationData) => {
    const paginationRange = useMemo(() => {
        const totalPageCount = totalCount;

        const totalPageNumbers = siblingCount + 5;

        if (totalPageNumbers >= totalPageCount) {
            return range(1, totalPageCount);
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

        const firstPageIndex = 1;
        const lastPageIndex = totalPageCount;

        if (!shouldShowLeftDots && shouldShowRightDots) {
            const leftItemCount = 3 + 2 * siblingCount;
            const leftRange = range(1, leftItemCount);

            return [...leftRange, DOTS, totalPageCount];
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            const rightItemCount = 3 + 2 * siblingCount;
            const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
            return [firstPageIndex, DOTS, ...rightRange];
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            const middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
        }
        return [];
    }, [totalCount, siblingCount, currentPage]);

    return paginationRange;
};
