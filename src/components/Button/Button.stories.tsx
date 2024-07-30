import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
    title: 'Example/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const svgFilterIcon = (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M13.1111 2H2.88889C2.39797 2 2 2.39797 2 2.88889V2.96514C2 3.20089 2.09365 3.42698 2.26035 3.59368L5.73965 7.07298C5.90635 7.23968 6 7.46578 6 7.70152V11.4506C6 11.7873 6.19022 12.0951 6.49137 12.2457L9.6784 13.8392C9.82615 13.9131 10 13.8056 10 13.6404V7.70152C10 7.46578 10.0937 7.23968 10.2603 7.07298L13.7397 3.59368C13.9064 3.42698 14 3.20089 14 2.96514V2.88889C14 2.39797 13.602 2 13.1111 2Z"
            stroke="#EBEBED"
            strokeLinecap="round"
        />
    </svg>
);

export const Ghost: Story = {
    args: {
        text: 'Text me',
        variant: 'primary',
        view: 'ghost',
    },
    argTypes: {
        variant: {
            options: ['primary', 'transparent', 'outlined'],
            control: {
                type: 'radio',
            },
        },
        size: {
            options: ['xs', 's', 'm', 'l'],
            control: {
                type: 'radio',
            },
        },
    },
};

export const Warning: Story = {
    args: {
        text: 'Text me',
        variant: 'primary',
        view: 'warning',
    },
    argTypes: {
        variant: {
            options: ['primary', 'transparent', 'outlined'],
            control: {
                type: 'radio',
            },
        },
        size: {
            options: ['xs', 's', 'm', 'l'],
            control: {
                type: 'radio',
            },
        },
    },
};

export const Danger: Story = {
    args: {
        text: 'Text me',
        variant: 'primary',
        view: 'danger',
    },
    argTypes: {
        variant: {
            options: ['primary', 'transparent', 'outlined'],
            control: {
                type: 'radio',
            },
        },
        size: {
            options: ['xs', 's', 'm', 'l'],
            control: {
                type: 'radio',
            },
        },
    },
};

export const Positive: Story = {
    args: {
        text: 'Text me',
        variant: 'primary',
        view: 'positive',
    },
    argTypes: {
        variant: {
            options: ['primary', 'transparent', 'outlined'],
            control: {
                type: 'radio',
            },
        },
        size: {
            options: ['xs', 's', 'm', 'l'],
            control: {
                type: 'radio',
            },
        },
    },
};

export const Brand: Story = {
    args: {
        text: 'Text me',
        variant: 'primary',
        view: 'brand',
    },
    argTypes: {
        variant: {
            options: ['primary', 'transparent', 'outlined'],
            control: {
                type: 'radio',
            },
        },
        size: {
            options: ['xs', 's', 'm', 'l'],
            control: {
                type: 'radio',
            },
        },
    },
};

const ButtonWithIcon = () => (
    <div
        style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
        }}
    >
        <Button text="Text me" variant="primary" view="ghost" size="l" iconLeft={svgFilterIcon} />
        <Button text="Text me" variant="primary" view="danger" size="l" iconLeft={svgFilterIcon} />
        <Button text="Text me" variant="primary" view="positive" size="l" iconLeft={svgFilterIcon} />
        <Button text="Text me" variant="primary" view="warning" size="l" iconLeft={svgFilterIcon} />
        <Button text="Text me" variant="primary" view="brand" size="l" iconLeft={svgFilterIcon} />
    </div>
);

export { ButtonWithIcon };
