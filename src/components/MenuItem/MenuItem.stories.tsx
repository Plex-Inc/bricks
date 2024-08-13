import React from 'react';
import type { Meta } from '@storybook/react';

import { Text } from '../Text/Text';

import { MenuItem } from './MenuItem';

const meta: Meta<typeof MenuItem> = {
    title: 'Example/MenuItem',
    component: MenuItem,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};
export default meta;

const MenuItemList = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {Array.from({ length: 6 }).map((_, index) => (
                <MenuItem key={index}>
                    <Text size="text_s">Item {index + 1}</Text>
                </MenuItem>
            ))}
        </div>
    );
};

export { MenuItemList };
