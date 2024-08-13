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
    text_xs: s.Size_text_xs,
    text_s: s.Size_text_s,
    text_m: s.Size_text_m,
    text_l: s.Size_text_l,
    text_header_3: s.Size_heading_l,
    text_header_2: s.Size_heading_xl,
    text_header_1: s.Size_heading_xxl,
    text_display_3: s.Size_display_l,
    text_display_2: s.Size_display_xl,
    text_display_1: s.Size_display_xxl,
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
    h1: [textSizeMap.text_header_1, textWeight.bolder],
    h2: [textSizeMap.text_header_2, textWeight.bold],
    h3: [textSizeMap.text_header_3, textWeight.bold],
    h4: [textSizeMap.text_l, textWeight.regular],
    h5: [textSizeMap.text_m, textWeight.regular],
    h6: [textSizeMap.text_s, textWeight.thin],
};

type TextProps<T extends keyof Tags> = {
    as?: keyof Tags;
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
    size = 'text_s',
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
                calcTextSizes(Tag, size),
                { [s.Text_strong]: strong, [s.Text_disabled]: isDisabled },
                textSizeMap[size],
                className,
            )}
        >
            {children}
        </Tag>
    );
};
