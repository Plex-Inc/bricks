import React from 'react';
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
    label: React.ReactNode;
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
    content: React.ReactNode;
}

interface TabsContextValue {
    switchTab: (nextState: TabActiveState) => void;
    active: string;
    content: React.ReactNode;
}

const TabsContext = React.createContext<TabsContextValue>({
    switchTab: () => {
        throw new Error('Context in not initialized');
    },
    active: 'unknown',
    content: null,
});

export const Tabs: React.FC<React.PropsWithChildren<TabsProps>> = ({
    view = 'background',
    active = 'unknown',
    size = 's',
    onChange,
    children,
    className,
}) => {
    const [{ name, content }, setActiveTab] = React.useState<TabActiveState>(() => ({ name: active, content: null }));
    const prevActiveTabName = React.useRef(name);

    React.useEffect(() => {
        if (prevActiveTabName.current !== name) {
            onChange?.(name);
        }
    }, [name, onChange]);

    return (
        <TabsContext.Provider value={{ switchTab: setActiveTab, active: name, content }}>
            <div className={cn(s.Tabs_wrapper, tabsSizeMap[size], viewMap[view], className)}>{children}</div>
        </TabsContext.Provider>
    );
};

export const Tab: React.FC<React.PropsWithChildren<TabProps>> = ({
    name,
    label,
    children,
    size = 's',
    className,
    ...rest
}) => {
    const { switchTab, active } = React.useContext(TabsContext);
    const prevChildRef = React.useRef<React.ReactNode>();

    const currentTab = active === name;

    const value: TabActiveState = React.useMemo(() => ({ name, content: children }), [name, children]);

    const handleTabChange = React.useCallback(() => switchTab(value), [switchTab, value]);

    React.useEffect(() => {
        if (currentTab && prevChildRef.current !== value.content) {
            handleTabChange();
            prevChildRef.current = value.content;
        }
    }, [currentTab, value, handleTabChange]);

    return (
        <span
            onClick={handleTabChange}
            className={cn(
                s.Tab_Wrapper,
                sizeMap[size],
                {
                    [s.Active_tab]: currentTab,
                },
                className,
            )}
            {...rest}
        >
            {label}
        </span>
    );
};
