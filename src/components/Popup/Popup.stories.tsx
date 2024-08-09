import * as React from 'react';
import type { Meta } from '@storybook/react';

import { Button } from '../Button/Button';
import { MenuItem } from '../MenuItem/MenuItem';
import { Text } from '../Text/Text';

import { Popup } from './Popup';

const meta: Meta<typeof Popup> = {
    title: 'Example/Popup',
    component: Popup,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};
export default meta;

export const PopupDefault = () => {
    const ref = React.useRef(null);
    return (
        <div style={{ height: 300 }}>
            <Button ref={ref} text="reference" />
            <Popup visible reference={ref} minWidth={100} maxWidth={300} placement="bottom" interactive>
                {Array.from({ length: 6 }).map((_, index) => (
                    <MenuItem key={index}>
                        <Text size="s">Item {index + 1}</Text>
                    </MenuItem>
                ))}
            </Popup>
        </div>
    );
};

const Layout = ({ children, gap = 80 }: { children: React.ReactNode; gap?: number }) => (
    <div
        style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap,
            marginLeft: -320,
            alignItems: 'center',
        }}
    >
        {children}
    </div>
);

interface ShownPopupProps {
    items: { title: string }[];
    minWidth?: number;
    maxWidth?: number;
    placement: React.ComponentProps<typeof Popup>['placement'];
    text?: string;
}

const ShownPopup: React.FC<ShownPopupProps> = ({ items, minWidth = 100, maxWidth, placement }) => {
    const ref = React.useRef(null);
    return (
        <div>
            <Button text="open" ref={ref} />
            <Popup visible reference={ref} minWidth={minWidth} maxWidth={maxWidth} placement={placement} interactive>
                <div>
                    <h6>
                        minW={minWidth}; maxW={maxWidth}
                    </h6>
                    {items?.map((item, index) => (
                        <div key={index} style={{ fontSize: 13, padding: 4 }}>
                            {index + 1}. {item.title}
                        </div>
                    ))}
                </div>
            </Popup>
        </div>
    );
};

const items1 = [{ title: 'lorem ipsum' }, { title: 'lorem ipsum' }, { title: 'lorem ipsum' }];
const items2 = [{ title: 'lor' }, { title: 'em' }];
const items3 = [
    { title: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum' },
    { title: 'lorem' },
    { title: 'lorem ipsum' },
];

const Popups = () => {
    return (
        <Layout>
            <ShownPopup items={items1} placement="top-end" minWidth={50} maxWidth={150} />
            <ShownPopup items={items2} placement="top-start" />
            <ShownPopup items={items1} placement="left" minWidth={50} maxWidth={150} />
            <ShownPopup items={items1} placement="right" minWidth={50} maxWidth={150} />
            <ShownPopup items={items3} placement="bottom-end" minWidth={150} maxWidth={250} />
            <ShownPopup items={items3} placement="bottom-start" minWidth={200} />
        </Layout>
    );
};

export { Popups };
