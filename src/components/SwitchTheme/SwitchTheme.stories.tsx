import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { SwitchTheme as SwitchComponent } from './SwitchTheme';

const meta: Meta<typeof SwitchComponent> = {
    title: 'Example/SwitchTheme',
    component: SwitchComponent,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SwitchTheme: Story = {
    args: {
        value: 'light',
    },
    argTypes: {
        value: {
            options: ['light', 'dark'],
            control: {
                type: 'radio',
            },
        },
    },
};

export const SwitchThemeDefault = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    return (
        <div>
            <SwitchComponent value={theme} onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
        </div>
    );
};
