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
    argTypes: {
        size: {
            options: ['s', 'm', 'l'],
            control: {
                type: 'radio',
            },
        },
        disabled: {
            options: [true, false],
            control: {
                type: 'radio',
            },
        },
        active: {
            options: [true, false],
            control: {
                type: 'radio',
            },
        },
    },
    tags: ['autodocs'],
};
export default meta;

const MenuItemList = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {Array.from({ length: 6 }).map((_, index) => (
                <MenuItem key={index} active={index === 3}>
                    <Text>Item {index + 1}</Text>
                </MenuItem>
            ))}
        </div>
    );
};

export { MenuItemList };
