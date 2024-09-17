import React, { ComponentProps, createContext, useCallback, useContext, useEffect, useState } from 'react';
import cn from 'classnames';

import { Typography } from '..';
import { nullable } from '../../utils';

import s from './Accordion.module.css';

const accordionSizeMap = {
    s: s.Accordion_size_s,
    m: s.Accordion_size_m,
    l: s.Accordion_size_l,
};

interface TextSizeMap {
    [key: string]: {
        title: ComponentProps<typeof Typography.Text>['size'];
        text: ComponentProps<typeof Typography.Text>['size'];
    };
}

interface AccordionTableProps {
    active: string;
    onChange: (value: string) => void;
    className?: string;
    children: React.ReactNode;
}

interface AccordionProps {
    leftIcon?: boolean;
    width?: string;
    rightIcon?: boolean;
    as?: ComponentProps<typeof Typography.Text>['as'];
    size?: keyof typeof accordionSizeMap;
    className?: string;
    name: string;
    title: string;
    children: React.ReactNode;
}

interface AccordionContextValue {
    openMenu: (value: string) => void;
    active: string;
}

function Icon() {
    return (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                    d="M12 6.4V17.6M6.40005 12H17.6001M12 23.2C5.81446 23.2 0.800049 18.1856 0.800049 12C0.800049 5.81441 5.81446 0.800003 12 0.800003C18.1856 0.800003 23.2001 5.81441 23.2001 12C23.2001 18.1856 18.1856 23.2 12 23.2Z"
                    stroke="#A6A8AE"
                    strokeWidth="1.5"
                />
            </svg>
        </div>
    );
}

function ActiveIcon() {
    return (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                    d="M6.40005 12H17.6001M12 23.2C5.81446 23.2 0.800049 18.1856 0.800049 12C0.800049 5.81441 5.81446 0.800003 12 0.800003C18.1856 0.800003 23.2001 5.81441 23.2001 12C23.2001 18.1856 18.1856 23.2 12 23.2Z"
                    stroke="#A6A8AE"
                    strokeWidth="1.5"
                />
            </svg>
        </div>
    );
}

const AccordionContext = createContext<AccordionContextValue>({
    openMenu: () => {
        throw new Error('Context in not initialized');
    },
    active: 'unknown',
});

export const AccordionTable = ({ children, active = 'unknown', onChange, className }: AccordionTableProps) => {
    const [openMenu, setOpenMenu] = useState(active);

    useEffect(() => {
        onChange?.(openMenu);
    }, [openMenu, onChange]);

    return (
        <AccordionContext.Provider value={{ openMenu: setOpenMenu, active: openMenu }}>
            <div className={cn(s.AccordionWrapper, className)}>{children}</div>
        </AccordionContext.Provider>
    );
};

const textSizeMap: TextSizeMap = {
    s: {
        title: 'text_s',
        text: 'text_xs',
    },
    m: {
        title: 'text_m',
        text: 'text_s',
    },
    l: {
        title: 'text_l',
        text: 'text_m',
    },
};

export const Accordion = ({
    title,
    children,
    size = 'm',
    as,
    width = '540px',
    leftIcon,
    rightIcon,
    name,
    className,
}: AccordionProps) => {
    const { openMenu, active } = useContext(AccordionContext);

    const currentAccordion = active === name;

    const onClickActive = useCallback(() => {
        if (currentAccordion) {
            return openMenu('');
        }
        return openMenu(name);
    }, [currentAccordion, active, name]);

    const textSize = textSizeMap[size];

    return (
        <div
            className={cn(
                s.Accordion,
                accordionSizeMap[size],
                className,
                {
                    [s.ActiveAccordion]: currentAccordion,
                },
                {
                    [s.RightIcon]: rightIcon,
                },
            )}
            style={{ maxWidth: `${width}` }}
            onClick={onClickActive}
        >
            {nullable(leftIcon, () => {
                if (currentAccordion) {
                    return <ActiveIcon />;
                }
                return <Icon />;
            })}
            <Typography.Text as="div" className={s.Content}>
                <Typography.Text as={as} size={textSize.title}>
                    {title}
                </Typography.Text>
                {nullable(currentAccordion, () => (
                    <Typography.Text as="div" size={textSize.text} className={s.TextSecondary}>
                        {children}
                    </Typography.Text>
                ))}
            </Typography.Text>
            {nullable(rightIcon, () => {
                if (currentAccordion) {
                    return <ActiveIcon />;
                }
                return <Icon />;
            })}
        </div>
    );
};
