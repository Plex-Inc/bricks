import React, {
    createContext,
    PropsWithChildren,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import cn from 'classnames';

import s from './Tab.module.css';

const sizeMap = {
    xs: s.Tab_size_xs,
    s: s.Tab_size_s,
    m: s.Tab_size_m,
    l: s.Tab_size_l,
    xl: s.Tab_size_xl,
};

const tabsSizeMap = {
    xs: s.Tabs_size_xs,
    s: s.Tabs_size_s,
    m: s.Tabs_size_m,
    l: s.Tabs_size_l,
    xl: s.Tabs_size_xl,
};

const viewMap = {
    layer: s.View_layer,
    background: s.View_background,
};

interface TabProps {
    name: string;
    label: ReactNode;
    size?: keyof typeof sizeMap;
    className?: string;
}

interface TabsProps {
    view?: keyof typeof viewMap;
    size?: keyof typeof tabsSizeMap;
    onChange?: (nextTab: string) => void;
    active?: string;
    className?: string;
}

interface TabActiveState {
    name: string;
    content: ReactNode;
}

interface TabsContextValue {
    switchTab: (nextState: TabActiveState) => void;
    active: string;
    content: ReactNode;
}

const TabsContext = createContext<TabsContextValue>({
    switchTab: () => {
        throw new Error('Context in not initialized');
    },
    active: 'unknown',
    content: null,
});

export const Tabs = ({
    view = 'background',
    active = 'unknown',
    size = 's',
    onChange,
    children,
    className,
}: PropsWithChildren<TabsProps>) => {
    const [{ name, content }, setActiveTab] = useState<TabActiveState>(() => ({ name: active, content: null }));

    useEffect(() => {
        onChange?.(name);
    }, [name, onChange]);

    return (
        <TabsContext.Provider value={{ switchTab: setActiveTab, active: name, content }}>
            <div className={cn(s.Tabs_wrapper, tabsSizeMap[size], viewMap[view], className)}>{children}</div>
        </TabsContext.Provider>
    );
};

export const Tab = ({ name, label, children, size = 's', className, ...rest }: PropsWithChildren<TabProps>) => {
    const { switchTab, active } = useContext(TabsContext);

    const currentTab = active === name;

    const value: TabActiveState = useMemo(() => {
        return {
            name,
            content: children,
        };
    }, [name, children]);

    const handleTabChange = useCallback(
        (value: TabActiveState) => () => {
            switchTab(value);
        },
        [switchTab],
    );

    useEffect(() => {
        if (currentTab) {
            handleTabChange(value)();
        }
    }, [currentTab, value, handleTabChange]);

    return (
        <span
            onClick={handleTabChange(value)}
            className={cn(s.Tab_Wrapper, sizeMap[size], { [s.Active_tab]: currentTab }, className)}
            {...rest}
        >
            {label}
        </span>
    );
};
