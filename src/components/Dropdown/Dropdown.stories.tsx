import React, { useState } from 'react';
import type { Meta } from '@storybook/react';

import { MenuItem } from '../MenuItem/MenuItem';
import { Text } from '../Text/Text';

import { Dropdown, DropdownPanel, DropdownTrigger } from './Dropdown';

const meta: Meta<typeof Dropdown> = {
    title: 'Example/Dropdown',
    component: Dropdown,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;

export const Default = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState<number | null>(null);

    return (
        <Dropdown isOpen={isOpen} onClose={() => setIsOpen(false)} arrow>
            <DropdownTrigger size="l" variant="background" onClick={() => setIsOpen(true)}>
                <Text>Click me. {value}</Text>
                {/* {...onESC} отрабатывает только тогда, когда есть фокус внутри дива. */}
            </DropdownTrigger>
            <DropdownPanel>
                {Array.from({ length: 5 }).map((_, index) => (
                    <MenuItem
                        onClick={() => {
                            setValue(index);
                            setIsOpen(false);
                        }}
                        key={index}
                    >
                        {index}
                    </MenuItem>
                ))}
            </DropdownPanel>
        </Dropdown>
    );
};
