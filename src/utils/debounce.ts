export function debounce<T extends (...args: unknown[]) => unknown>(func: T, wait = 300, immediate = false) {
    let timeout: NodeJS.Timeout | null;

    return (...args: Parameters<T>) => {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };

        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(later, wait);

        if (immediate && !timeout) {
            func(...args);
        }
    };
}
