import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import { Text } from '../Text/Text';

import s from './Timer.module.css';

export interface TimerProps {
    initialTime: string;
    createDate: Date;
    expireDate: Date;
    view?: keyof typeof viewMap;
    size?: keyof typeof sizeMap;
}

const viewMap = {
    default: {
        style: s.Timer_default,
        color: 'var(--button-brand)',
    },
    success: {
        style: s.Timer_success,
        color: 'var(--button-positive)',
    },
    error: {
        style: s.Timer_error,
        color: 'var(--button-danger)',
    },
};

const sizeMap = {
    s: {
        style: s.Size_timer_s,
        r: '24',
        cx: '26',
        cy: '26',
    },
    m: {
        style: s.Size_timer_m,
        r: '26',
        cx: '28',
        cy: '28',
    },
    l: {
        style: s.Size_timer_l,
        r: '28',
        cx: '30',
        cy: '30',
    },
    xl: {
        style: s.Size_timer_xl,
        r: '30',
        cx: '32',
        cy: '32',
    },
};

export const Timer = ({ expireDate, createDate, initialTime, view = 'default', size = 'l', ...rest }: TimerProps) => {
    const [timeRemaining, setTimeRemaining] = useState<string>(initialTime);
    const [dashArray, setDashArray] = useState(0);
    const radius = Number(sizeMap[size].r);
    const totalLength = 2 * Math.PI * radius;

    function calculateDasharray(startTime: number, endTime: number, currentTime: number) {
        const elapsedTime = currentTime - startTime;
        const totalTime = endTime - startTime;
        const completionPercentage = (elapsedTime / totalTime) * 100;
        const strokeDasharray = (totalLength * completionPercentage) / 100;
        setDashArray(strokeDasharray);
    }

    useEffect(() => {
        const x = setInterval(() => {
            const now = new Date().getTime();
            const expireTime = new Date(expireDate);
            expireTime.setSeconds(expireTime.getSeconds() + 1);
            const expire = expireTime.getTime();
            const create = new Date(createDate).getTime();
            const distance = expire - now;

            const minutes = Math.floor(
                // eslint-disable-next-line no-restricted-globals
                !isNaN((distance % (1000 * 60 * 60)) / (1000 * 60)) ? (distance % (1000 * 60 * 60)) / (1000 * 60) : 30,
            );
            // eslint-disable-next-line no-restricted-globals
            const seconds = Math.floor(!isNaN((distance % (1000 * 60)) / 1000) ? (distance % (1000 * 60)) / 1000 : 0);
            calculateDasharray(create, expire, now);
            if (distance < 0) {
                setTimeRemaining('00:00');
                setDashArray(0);
                return () => clearInterval(x);
            }
            setTimeRemaining(`
              ${minutes > 9 ? minutes : `0${minutes}`}:${seconds > 9 ? seconds : `0${seconds}`}
            `);
        }, 1000);

        return () => clearInterval(x);
    }, [timeRemaining]);

    return (
        <div className={cn(s.Timer_wrapper, sizeMap[size].style)} {...rest}>
            <Text as="div" strong>
                {timeRemaining.length > 0 && timeRemaining}
            </Text>
            <span className={s.Timer_box} style={{ borderColor: viewMap[view].color }} />
            <svg className={s.Timer_border}>
                <circle
                    transform={`rotate(-90, ${sizeMap[size].cx}, ${sizeMap[size].cy})`}
                    className={cn(s.Timer_border_circle, viewMap[view].style)}
                    r={sizeMap[size].r}
                    cx={sizeMap[size].cx}
                    cy={sizeMap[size].cy}
                    style={{
                        strokeDasharray: totalLength,
                        strokeDashoffset: -dashArray,
                    }}
                />
            </svg>
        </div>
    );
};
