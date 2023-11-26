import cn from 'classnames';
import React, { FC, ReactNode } from 'react';

import s from './Title.module.css';

type Tags = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface TitleProps {
    title: string;
    tag: Tags;
    className?: string;
}

const tagsMap: Record<Tags, ({ title, className }: { title: string; className: string }) => ReactNode> = {
    h1: ({ title, className }) => <h1 className={className}>{title}</h1>,
    h2: ({ title, className }) => <h2 className={className}>{title}</h2>,
    h3: ({ title, className }) => <h3 className={className}>{title}</h3>,
    h4: ({ title, className }) => <h4 className={className}>{title}</h4>,
    h5: ({ title, className }) => <h5 className={className}>{title}</h5>,
    h6: ({ title, className }) => <h6 className={className}>{title}</h6>,
};

const Title: FC<TitleProps> = ({ tag, title, className }) => {
    return tagsMap[tag]({ title, className: cn(s.title, s[tag], className) });
};

export default Title;
