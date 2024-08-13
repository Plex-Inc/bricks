import React, { InputHTMLAttributes } from 'react';
import cn from 'classnames';

import { Text, type Tags } from '../Text/Text';
import { nullable } from '../../utils';

import s from './Switch.module.css';

export const sizeMap = {
    m: s.Switch_size_m,
    l: s.Switch_size_l,
};

const sizeSwitch = {
    m: 'text_m',
    l: 'text_l',
} as const;

interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    checked: boolean;
    label?: React.ReactNode;
    positionText?: 'left' | 'right';
    size: keyof typeof sizeSwitch;
    as?: keyof Tags;
    strong?: boolean;
}

export const Switch: React.FC<SwitchProps> = ({
    checked,
    className,
    label,
    as = 'div',
    size = 'l',
    positionText = 'right',
    disabled,
    strong,
    ...rest
}) => {
    return (
        <label className={cn(s.SwitchLabel, { [s.SwitchDisabled]: disabled }, className)}>
            {nullable(label && positionText === 'left', () => (
                <Text size={sizeSwitch[size]} as={as} strong={strong}>
                    {label}
                </Text>
            ))}
            <div className={cn(s.SwitchButton, sizeMap[size])}>
                <input className={cn(s.SliderInput)} type="checkbox" checked={checked} {...rest} />
                <span className={cn(s.SwitchSlider)}></span>
            </div>
            {nullable(label && positionText === 'right', () => (
                <Text size={sizeSwitch[size]} as={as} strong={strong}>
                    {label}
                </Text>
            ))}
        </label>
    );
};
