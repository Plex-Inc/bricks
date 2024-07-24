import React, { MutableRefObject, TextareaHTMLAttributes, forwardRef } from 'react';
import cn from 'classnames';

import { nullable } from '../../utils/nullable';

import s from './Textarea.module.css';

const viewMap = {
    default: s.Textarea_default,
    success: s.Textarea_success,
    error: s.Textarea_error,
};

const variantMap = {
    background: s.Textarea_background,
    layer: s.Textarea_layer,
};

interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
    ref?: MutableRefObject<HTMLDivElement | null>;
    view?: keyof typeof viewMap;
    variant?: keyof typeof variantMap;
    errorMessage?: string;
    placeholder?: string;
}

export const TextareaComponent = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ view = 'default', variant = 'background', placeholder, errorMessage, ref }) => {
        return (
            <div className={s.TextareaWrapper} ref={ref}>
                <textarea
                    className={cn(s.Textarea, viewMap[view], variantMap[variant])}
                    name="Textarea"
                    placeholder={placeholder}
                    cols={30}
                    rows={4}
                />
                {nullable(errorMessage, (message) => (
                    <div className={s.Error}>
                        <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M13.2734 12.1927L7.93109 2.71356C7.72571 2.34898 7.36505 2.16669 7.00438 2.16669C6.64372 2.16669 6.28305 2.34898 6.05514 2.71356L0.71531 12.1927C0.327346 12.9193 0.839313 13.8334 1.66305 13.8334H12.3477C13.1682 13.8334 13.6817 12.9219 13.2734 12.1927ZM1.90951 12.5834L6.98184 3.54169L12.0988 12.5834H1.90951ZM7.00438 10.112C6.56958 10.112 6.21693 10.4787 6.21693 10.9307C6.21693 11.3828 6.57033 11.7495 7.00538 11.7495C7.44043 11.7495 7.79183 11.3828 7.79183 10.9307C7.79083 10.4792 7.44018 10.112 7.00438 10.112ZM6.41659 6.12502V8.62502C6.41659 8.97137 6.67377 9.25002 7.00438 9.25002C7.33499 9.25002 7.58325 8.97007 7.58325 8.62502V6.12502C7.58325 5.78127 7.33749 5.50002 7.00438 5.50002C6.67127 5.50002 6.41659 5.78127 6.41659 6.12502Z"
                                fill="#ED576B"
                            />
                        </svg>
                        <span className={s.ErrorMessage}>{message}</span>
                    </div>
                ))}
            </div>
        );
    },
);
