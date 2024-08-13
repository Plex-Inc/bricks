import React, { InputHTMLAttributes } from 'react';
import cn from 'classnames';

import { Text, type Tags } from '../Text/Text';
import { nullable } from '../../utils';

import s from './Switch.module.css';

export const sizeMap = {
    text_m: s.Switch_size_m,
    text_l: s.Switch_size_l,
};

interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    checked: boolean;
    label?: React.ReactNode;
    positionText?: 'left' | 'right';
    size: keyof typeof sizeMap;
    as?: keyof Tags;
    strong?: boolean;
}

export const Switch: React.FC<SwitchProps> = ({
    checked,
    className,
    label,
    as = 'div',
    size = 'text_m',
    positionText = 'right',
    disabled,
    strong,
    ...rest
}) => {
    return (
        <label className={cn(s.SwitchLabel, { [s.SwitchDisabled]: disabled }, className)}>
            {nullable(label && positionText === 'left', () => (
                <Text size={size} as={as} strong={strong}>
                    {label}
                </Text>
            ))}
            <div className={cn(s.SwitchButton, sizeMap[size])}>
                <input className={cn(s.SliderInput)} type="checkbox" checked={checked} {...rest} />
                <span className={cn(s.SwitchSlider)}></span>
            </div>
            {nullable(label && positionText === 'right', () => (
                <Text size={size} as={as} strong={strong}>
                    {label}
                </Text>
            ))}
        </label>
    );
};
