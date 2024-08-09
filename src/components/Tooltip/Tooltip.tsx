import React, { ComponentProps } from 'react';
import cn from 'classnames';

import { Popup } from '../Popup/Popup';

import s from './Tooltip.module.css';

const viewMap = {
    default: s.Tooltip_default,
    danger: s.Tooltip_danger,
    success: s.Tooltip_success,
    warning: s.Tooltip_warning,
};

interface TooltipProps extends ComponentProps<typeof Popup> {
    view?: keyof typeof viewMap;
}

export const Tooltip: React.FC<TooltipProps> = ({ className, view = 'default', children, arrow = true, ...props }) => (
    <Popup className={cn(s.Tooltip, viewMap[view], className)} arrow={arrow} {...props}>
        {children}
    </Popup>
);
