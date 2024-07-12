import cn from 'classnames';
import React from 'react';

import s from './Text.module.css';

export interface Tags {
    div: React.JSX.IntrinsicElements['div'];
    p: React.JSX.IntrinsicElements['p'];
    span: React.JSX.IntrinsicElements['span'];
    label: React.JSX.IntrinsicElements['label'];
    h1: React.JSX.IntrinsicElements['h1'];
    h2: React.JSX.IntrinsicElements['h2'];
    h3: React.JSX.IntrinsicElements['h3'];
    h4: React.JSX.IntrinsicElements['h4'];
    h5: React.JSX.IntrinsicElements['h5'];
    h6: React.JSX.IntrinsicElements['h6'];
}

export const textSizeMap = {
    xs: s.Size_text_xs,
    s: s.Size_text_s,
    m: s.Size_text_m,
    l: s.Size_text_l,
};

const textWeight = {
    bolder: s.TextBolder,
    bold: s.TextBold,
    regular: s.TextRegular,
    thin: s.TextThin,
    thinner: s.TextThinner,
};

type HeadingTags = Extract<keyof Tags, `h${number}`>;

const headingClasses: Record<HeadingTags, [string, string]> = {
    h1: [textSizeMap.l, textWeight.bolder],
    h2: [textSizeMap.l, textWeight.bold],
    h3: [textSizeMap.m, textWeight.bold],
    h4: [textSizeMap.m, textWeight.regular],
    h5: [textSizeMap.s, textWeight.regular],
    h6: [textSizeMap.xs, textWeight.thin],
};

type TextProps<T extends keyof Tags> = {
    as: keyof Tags;
    children: React.ReactNode;
    size?: keyof typeof textSizeMap;
    isDisabled?: boolean;
    strong?: boolean;
} & Tags[T];

const defaultTagName: keyof Pick<React.JSX.IntrinsicElements, 'div'> = 'div';

const isHeading = (tag: string): tag is HeadingTags => /^(h[1-6])/.test(tag);

const calcTextSizes = (tag: string, size?: keyof typeof textSizeMap) =>
    isHeading(tag) ? headingClasses[tag] : [size ? textSizeMap[size] : undefined];

export const Text = <T extends typeof defaultTagName>({
    as,
    children,
    size = 's',
    strong,
    isDisabled,
    className,
    ...rest
}: TextProps<T>) => {
    const Tag: string = as || defaultTagName;
    return (
        <Tag
            {...rest}
            className={cn(
                calcTextSizes(as, size),
                { [s.Text_strong]: strong, [s.Text_disabled]: isDisabled },
                textSizeMap[size],
                className,
            )}
        >
            {children}
        </Tag>
    );
};
