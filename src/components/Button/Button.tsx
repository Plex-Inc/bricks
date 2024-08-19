import React, { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';
import cn from 'classnames';

import { nullable } from '../../utils';

import s from './Button.module.css';

const variantMap = {
    primary: s.Button_primary,
    transparent: s.Button_transparent,
    outlined: s.Button_outlined,
};

const variantViewMap = {
    ghost: {
        primary: s.Button_ghost_primary,
        transparent: s.Button_ghost_transparent,
        outlined: s.Button_ghost_outlined,
    },
    warning: {
        primary: s.Button_warning_primary,
        transparent: s.Button_warning_transparent,
        outlined: s.Button_warning_outlined,
    },
    danger: {
        primary: s.Button_danger_primary,
        transparent: s.Button_danger_transparent,
        outlined: s.Button_danger_outlined,
    },
    positive: {
        primary: s.Button_positive_primary,
        transparent: s.Button_positive_transparent,
        outlined: s.Button_positive_outlined,
    },
    brand: {
        primary: s.Button_brand_primary,
        transparent: s.Button_brand_transparent,
        outlined: s.Button_brand_outlined,
    },
};

const brickMap = {
    left: s.Button_brick_left,
    right: s.Button_brick_right,
    center: s.Button_brick_center,
};

const sizeMap = {
    xs: s.Button_size_xs,
    s: s.Button_size_s,
    m: s.Button_size_m,
    l: s.Button_size_l,
};

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    text?: string;
    iconLeft?: ReactNode;
    iconRight?: ReactNode;
    view?: keyof typeof variantViewMap;
    variant?: keyof typeof variantMap;
    brick?: keyof typeof brickMap;
    size?: keyof typeof sizeMap;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            iconLeft,
            iconRight,
            text,
            view = 'ghost',
            variant = 'primary',
            brick,
            size = 's',
            type = 'button',
            disabled,
            ...rest
        },
        ref,
    ) => {
        const icons = [iconLeft, iconRight].filter(Boolean);

        if (!text && icons.length === 2) {
            throw new Error("Button can't have two icons without text");
        }

        const classes = [
            s.Button,
            variantMap[variant],
            variantViewMap[view][variant],
            sizeMap[size],
            brick ? [s.Button_brick, brickMap[brick]] : '',
            className,
        ];

        return (
            <button className={cn(classes)} disabled={disabled} ref={ref} type={type} {...rest}>
                {nullable(
                    !text && icons,
                    ([icon]) => (
                        <span className={cn(s.Icon, s.Icon_center)}>{icon}</span>
                    ),
                    <>
                        {nullable(iconLeft, (icon) => (
                            <span className={cn(s.Icon, s.Icon_left)}>{icon}</span>
                        ))}
                        {nullable(text, (t) => (
                            <span className={s.Text}>{t}</span>
                        ))}
                        {nullable(iconRight, (icon) => (
                            <span className={cn(s.Icon, s.Icon_right)}>{icon}</span>
                        ))}
                    </>,
                )}
            </button>
        );
    },
);
