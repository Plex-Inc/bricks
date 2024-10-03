import React, { ComponentProps, HTMLAttributes } from 'react';
import cn from 'classnames';

import { Avatar } from '../Avatar/Avatar';
import { Typography } from '..';

import s from './User.module.css';

interface IsizeMap {
    [key: string]: {
        avatar: ComponentProps<typeof Avatar>['size'];
        text: ComponentProps<typeof Typography.Text>['size'];
    };
}

const sizeMap: IsizeMap = {
    s: {
        avatar: 'm',
        text: 'text_s',
    },
    m: {
        avatar: 'l',
        text: 'text_m',
    },
    l: {
        avatar: 'xl',
        text: 'text_l',
    },
};

interface UserProps extends HTMLAttributes<HTMLDivElement> {
    nickname: string;
    className?: string;
    size?: keyof typeof sizeMap;
}

export const User = ({ size = 'm', nickname, className, ...props }: UserProps) => {
    return (
        <div className={cn(s.User, className)} {...props}>
            <Avatar name={nickname} size={sizeMap[size].avatar} />
            <Typography.Text size={sizeMap[size].text}>{nickname}</Typography.Text>
        </div>
    );
};
