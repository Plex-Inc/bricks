import React, {
    CSSProperties,
    InputHTMLAttributes,
    MutableRefObject,
    ReactNode,
    forwardRef,
    useEffect,
    useMemo,
    useRef,
} from 'react';
import cn from 'classnames';

import { nullable } from '../../utils';

import s from './Input.module.css';

const viewMap = {
    default: s.Input_default,
    success: s.Input_success,
    error: s.Input_error,
};

const variantMap = {
    background: s.Input_background,
    layer: s.Input_layer,
};

const sizeMap = {
    s: s.Input_size_s,
    m: s.Input_size_m,
    l: s.Input_size_l,
};

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    forwardedRef?: MutableRefObject<HTMLDivElement | null>;
    pointerEvents?: CSSProperties['pointerEvents'];
    outline?: boolean;
    iconLeft?: ReactNode;
    iconRight?: ReactNode;
    view?: keyof typeof viewMap;
    variant?: keyof typeof variantMap;
    size?: keyof typeof sizeMap;
    placeholder?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({
        className,
        iconLeft,
        iconRight,
        view = 'default',
        variant = 'background',
        size = 's',
        autoComplete = 'none',
        outline,
        pointerEvents,
        autoFocus,
        placeholder,
        forwardedRef,
        ...rest
    }) => {
        const inputRef = useRef<HTMLInputElement>(null);

        useEffect(() => {
            if (autoFocus) {
                queueMicrotask(() => {
                    inputRef.current?.focus();
                });
            }
        }, [autoFocus]);

        const wrapperStyles: Record<string, unknown> = useMemo(() => {
            const wrapper: Record<string, unknown> = {};

            if (pointerEvents) {
                wrapper['--input-pointer-events'] = pointerEvents;
            }

            return wrapper;
        }, [pointerEvents]);

        return (
            <div className={cn(s.InputWrapper, className)} style={wrapperStyles} ref={forwardedRef}>
                <input
                    className={cn(s.Input, viewMap[view], variantMap[variant], sizeMap[size], {
                        [s.Input_outline]: outline,
                        [s.InputWrapper_icon_left]: iconLeft,
                        [s.InputWrapper_icon_right]: iconRight,
                    })}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    autoFocus={autoFocus}
                    {...rest}
                />

                {nullable(iconLeft, (icon) => (
                    <span
                        className={cn(s.Icon, s.Icon_left, {
                            [s.Active_icon]: view !== 'default',
                            [s.NoActive_icon]: view === 'default',
                        })}
                    >
                        {icon}
                    </span>
                ))}

                {nullable(iconRight, (icon) => (
                    <span
                        className={cn(s.Icon, s.Icon_right, {
                            [s.Active_icon]: view !== 'default',
                            [s.NoActive_icon]: view === 'default',
                        })}
                    >
                        {icon}
                    </span>
                ))}
            </div>
        );
    },
);
