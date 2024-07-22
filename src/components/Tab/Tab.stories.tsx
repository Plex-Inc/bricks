import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { Tab, Tabs } from './Tab';

const meta: Meta<typeof Tab> = {
    title: 'Example/Tab',
    component: Tab,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: 'Tab',
        name: 'tab-1',
        size: 'm',
    },
    argTypes: {
        size: {
            options: ['xs', 's', 'm', 'l', 'xl'],
            control: {
                type: 'radio',
            },
        },
    },
};

const TabsDefault = () => {
    const [active, setActive] = useState('tab-1');
    return (
        <Tabs view="layer" size="l" active={active} onChange={setActive}>
            <Tab name="tab-1" label={'Tab-1'} size="l" />
            <Tab name="tab-2" label={'Tab-2'} size="l" />
            <Tab name="tab-3" label={'Tab-3'} size="l" />
        </Tabs>
    );
};

export { TabsDefault };
