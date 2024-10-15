import React, {
    ComponentProps,
    createContext,
    CSSProperties,
    MouseEventHandler,
    MutableRefObject,
    ReactNode,
    useCallback,
    useContext,
    useMemo,
    useRef,
} from 'react';
import cn from 'classnames';

import { Popup } from '../Popup/Popup';
import { nullable } from '../../utils';
import { KeyCode, useKeyboard } from '../../hooks';

import styles from './Dropdown.module.css';

interface DropdownContextProps {
    isOpen?: boolean;
    panelRef?: MutableRefObject<HTMLDivElement | null>;
    arrow?: boolean;
    onClose?: () => void;
}

const DropdownContext = createContext<DropdownContextProps>({
    isOpen: false,
    arrow: false,
});

const useDropdownContext = () => {
    const ctx = useContext(DropdownContext);

    if (!ctx) {
        throw new Error("Don't use before initialization or outside of `Dropdown` component");
    }

    return ctx;
};

const DropdownArrow = () => {
    const { isOpen } = useDropdownContext();

    return (
        <svg
            width="12"
            height="12"
            style={{ transform: `rotate(${isOpen ? '0' : '180'}deg)`, transition: 'transform 0.2s ease-in-out' }}
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g id="Icon_down_small">
                <path
                    id="Icon"
                    d="M9 7.39644L6.35355 4.74999C6.15829 4.55473 5.84171 4.55473 5.64645 4.74999L3 7.39644"
                    stroke="#EBEBED"
                    strokeLinecap="round"
                />
            </g>
        </svg>
    );
};

interface DropdownProps extends Omit<DropdownContextProps, 'panelRef'> {
    children?: ReactNode;
}

export const Dropdown = ({ children, isOpen, onClose, arrow }: DropdownProps) => {
    const panelRef = useRef<HTMLDivElement | null>(null);

    const ctx = useMemo(() => {
        return {
            isOpen,
            panelRef,
            onClose,
            arrow,
        };
    }, [isOpen, onClose, arrow]);

    return <DropdownContext.Provider value={ctx}>{children}</DropdownContext.Provider>;
};

const sizeMap = {
    s: styles.Dropdown_size_s,
    m: styles.Dropdown_size_m,
    l: styles.Dropdown_size_l,
};

const variantMap = {
    background: styles.Dropdown_background,
    layer: styles.Dropdown_layer,
};

interface DropdownTriggerProps {
    className?: string;
    label?: ReactNode;
    error?: boolean;
    readOnly?: boolean;
    disabled?: boolean;
    children?: ReactNode;
    placeholder?: string;
    style?: CSSProperties;
    size?: keyof typeof sizeMap;
    variant?: keyof typeof variantMap;
    onClick?: MouseEventHandler<HTMLDivElement>;
}

export const DropdownTrigger = ({
    style,
    size = 'm',
    variant = 'layer',
    children,
    readOnly,
    className,
    disabled,
    error,
    onClick,
}: DropdownTriggerProps) => {
    const { panelRef, isOpen, arrow, onClose } = useDropdownContext();
    const [onESC] = useKeyboard([KeyCode.Escape], isOpen ? onClose : undefined);

    const hasArrow = !readOnly && arrow;
    const handleClick: MouseEventHandler<HTMLDivElement> = useCallback((e) => {
        onClick && !disabled && onClick(e);
    }, []);
    return (
        <div
            ref={panelRef}
            onClick={handleClick}
            {...onESC}
            style={style}
            className={cn(
                variantMap[variant],
                sizeMap[size],
                { [styles.DropdownActive]: isOpen },
                { [styles.DropdownDisabled]: disabled },
                { [styles.DropdownError]: error },
                styles.DropdownTrigger,
                className,
            )}
        >
            {children} {hasArrow ? <DropdownArrow /> : null}
        </div>
    );
};

type PopupProps = ComponentProps<typeof Popup>;
interface DropdownPanelProps extends Omit<PopupProps, 'minWidth' | 'maxWidth'> {
    width?: PopupProps['minWidth'];
}

export const DropdownPanel = ({
    children,
    className,
    onClickOutside,
    width,
    offset = [0, 4],
    placement = 'bottom',
    ...props
}: DropdownPanelProps) => {
    const { panelRef, isOpen, onClose } = useDropdownContext();

    const onClick = useCallback(
        (...args: Parameters<NonNullable<PopupProps['onClickOutside']>>) => {
            onClickOutside?.(...args);
            onClose?.();
        },
        [onClose, onClickOutside],
    );

    return nullable(isOpen, () => (
        // The content component instance remains in memory/mounted across open/closes of the popover.
        // https://github.com/atomiks/tippyjs-react/issues/82
        <Popup
            arrow={false}
            interactive
            visible={isOpen}
            reference={panelRef}
            placement={placement}
            offset={offset}
            onClickOutside={onClick}
            className={cn(className)}
            minWidth={width}
            maxWidth={width}
            {...props}
        >
            {children}
        </Popup>
    ));
};
