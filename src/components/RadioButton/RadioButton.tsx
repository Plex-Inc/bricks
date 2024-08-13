import React, { InputHTMLAttributes, MutableRefObject, forwardRef } from 'react';
import cn from 'classnames';

import { nullable } from '../../utils';
import { Text, Tags, textSizeMap } from '../Text/Text';

import s from './RadioButton.module.css';

export const sizeMap = {
    m: s.RadioButton_size_m,
    l: s.RadioButton_size_l,
};

interface RadioButtonProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    forwardedRef?: MutableRefObject<HTMLDivElement | null>;
    disabled?: boolean;
    checked?: boolean;
    value?: string;
    label?: React.ReactNode;
    as?: keyof Tags;
    textSize?: keyof typeof textSizeMap;
    positionText?: 'right' | 'left';
    strong?: boolean;
    size?: keyof typeof sizeMap;
}

export const RadioButton = forwardRef<HTMLLabelElement, RadioButtonProps>(
    (
        {
            checked,
            disabled,
            label,
            value,
            as = 'div',
            textSize = 'text_l',
            positionText = 'right',
            strong,
            size = 'm',
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
                    <input
                        type="radio"
                        disabled={disabled}
                        className={s.RadioInput}
                        checked={checked}
                        value={value}
                        {...rest}
                    />
                    <div
                        className={cn(s.RadioButton, s.RadioButton_default, sizeMap[size], {
                            [s.RadioButton_select]: checked,
                        })}
                    >
                        <span className={cn(s.NestedButton)} />
                    </div>
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
