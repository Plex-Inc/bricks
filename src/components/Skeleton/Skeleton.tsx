import React from 'react';
import cn from 'classnames';

import style from './Skeleton.module.css';

interface Skeleton {
    height: string;
    width?: string;
    className?: string;
}

export const Skeleton = ({ height = '72px', width = '100%', className }: Skeleton) => {
    return <div className={cn(className, style.Skeleton)} style={{ height, width }} />;
};
