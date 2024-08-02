import React, { ComponentProps, HTMLAttributes } from 'react';
import cn from 'classnames';

import { Circle } from '../Circle/Circle';
import { getInitials } from '../../utils/getInitials';
import { nullable } from '../../utils';

import s from './Avatar.module.css';

const sizeMap = {
    xxs: s.Avatar_xxs,
    xs: s.Avatar_xs,
    s: s.Avatar_s,
    m: s.Avatar_m,
    l: s.Avatar_l,
    xl: s.Avatar_xl,
    xxl: s.Avatar_xxl,
    xxxl: s.Avatar_xxxl,
    large: s.Avatar_large,
};

interface AvatarProps extends HTMLAttributes<HTMLImageElement> {
    size: ComponentProps<typeof Circle>['size'];
    name?: string;
    src?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ size = 'l', className, name, src, ...rest }) => {
    return nullable(
        src,
        () => <img className={cn(s.Avatar, sizeMap[size], className)} src={src} />,

        <Circle str={`${name}`} size={size} {...rest}>
            {getInitials(name)}
        </Circle>,
    );
};
