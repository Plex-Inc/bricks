import React, { PropsWithChildren, ReactNode, useEffect } from 'react';
import cn from 'classnames';

import { nullable } from '../../utils';
import { Portal } from '../Portal/Portal';
import { KeyCode, useKeyboard } from '../../hooks';
import { Text } from '../Text/Text';

import s from './Modal.module.css';

const sizeMap = {
    s: s.Modal_size_s,
    m: s.Modal_size_m,
};

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    backEvent?: () => void;
    title?: string;
    size?: keyof typeof sizeMap;
    isOpen?: boolean;
    onClose?: () => void;
    isCloseIcon?: boolean;
}

export interface CloseModal {
    className?: string;
    children: React.ReactNode;
}

export interface TextHeaderModal {
    title: string;
    children?: ReactNode;
}

export type ModalHeaderType = Omit<ModalProps, 'className' | 'isOpen'>;

export const ModalOverlay = ({ children }: PropsWithChildren) => <div className={cn(s.ModalOverlay)}>{children}</div>;

export const CloseModal = ({ children, ...props }: CloseModal) => (
    <button className={s.HeaderRight} {...props}>
        {children}
    </button>
);

export const TextHeaderModal = ({ title, children }: TextHeaderModal) => (
    <div className={s.HeaderLeft}>
        {children}
        <Text as="span" size="l" strong>
            {title}
        </Text>
    </div>
);

export const ModalHeader = ({ size = 'm', children }: ModalHeaderType) => {
    return <div className={cn(s.Header, sizeMap[size])}>{children}</div>;
};

export const Modal = ({ size = 'm', isOpen, onClose, children, className, ...props }: ModalProps) => {
    const [onESC] = useKeyboard([KeyCode.Escape], () => onClose?.(), {
        disableGlobalEvent: false,
    });

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return nullable(isOpen, () => (
        <Portal id="modal">
            <ModalOverlay>
                <div className={cn(s.Wrapper, className)} {...onESC} {...props}>
                    <div
                        className={cn(s.Content, {
                            [s.Content_size_s]: size === 's',
                        })}
                    >
                        {children}
                    </div>
                </div>
            </ModalOverlay>
        </Portal>
    ));
};
