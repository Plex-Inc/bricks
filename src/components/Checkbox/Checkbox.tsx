import React, { InputHTMLAttributes, MutableRefObject, forwardRef } from 'react';
import cn from 'classnames';

import { nullable } from '../../utils';
import { Text, type Tags, type textSizeMap } from '../Text/Text';

import s from './Checkbox.module.css';

interface IconCheck {
    disabled: boolean;
}

function IconCheck({ disabled = false }: IconCheck) {
    return (
        <span className={s.CheckIcon}>
            <svg width="auto" height="auto" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M9 1L4.35355 5.64645C4.15829 5.84171 3.84171 5.84171 3.64645 5.64645L1 3"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke={!disabled ? '#EBEBED' : 'var(--text-ghost)'}
                />
            </svg>
        </span>
    );
}

export const sizeMap = {
    m: s.CheckBox_size_m,
    l: s.CheckBox_size_l,
};

interface CheckBoxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    forwardedRef?: MutableRefObject<HTMLDivElement | null>;
    disabled?: boolean;
    label?: React.ReactNode;
    as?: keyof Tags;
    textSize?: keyof typeof textSizeMap;
    positionText?: 'left' | 'right';
    strong?: boolean;
    size: keyof typeof sizeMap;
}

export const Checkbox = forwardRef<HTMLLabelElement, CheckBoxProps>(
    (
        {
            disabled = false,
            label,
            as = 'div',
            strong,
            textSize = 'l',
            size = 'm',
            positionText = 'right',
            checked,
            ...rest
        },
        forwardedRef,
    ) => {
        return (
            <label className={cn(s.WrapperLabel, { [s.WrapperDisabled]: disabled })} ref={forwardedRef}>
                <div className={cn(s.Wrapper)}>
                    {nullable(label && positionText === 'left', () => (
                        <Text as={as} size={textSize} isDisabled={disabled} strong={strong}>
                            {label}
                        </Text>
                    ))}
                    <input type="checkbox" disabled={disabled} className={s.checkInput} checked={checked} {...rest} />
                    <span
                        className={cn(s.Checkmark, s.CheckBox_default, sizeMap[size], {
                            [s.CheckBox_select]: checked,
                        })}
                    >
                        <IconCheck disabled={disabled} />
                    </span>
                    {nullable(label && positionText === 'right', () => (
                        <Text as={as} size={textSize} isDisabled={disabled} strong={strong}>
                            {label}
                        </Text>
                    ))}
                </div>
            </label>
        );
    },
);
