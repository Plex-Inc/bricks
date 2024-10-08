import { useEffect, useState } from 'react';

import { debounce } from '../utils/debounce';

export function useIsMobile(): boolean {
    const [{ phone, tablet, desktop }, setCurrentInfo] = useState({
        phone: false,
        tablet: false,
        desktop: true,
    });

    useEffect(() => {
        function update() {
            const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
            const isTablet = window.matchMedia('(min-width: 768px)').matches;
            const newInfo = {
                phone: !isDesktop && !isTablet,
                tablet: !isDesktop && isTablet,
                desktop: isDesktop,
            };

            if (newInfo.tablet !== tablet || newInfo.phone !== phone || newInfo.desktop !== desktop) {
                setCurrentInfo(newInfo);
            }
        }

        update();
        const debouncedUpdate = debounce(update, 150);

        window.addEventListener('resize', debouncedUpdate);

        return () => {
            window.removeEventListener('resize', debouncedUpdate);
        };
    }, [phone, tablet, desktop]);

    return phone || tablet;
}
