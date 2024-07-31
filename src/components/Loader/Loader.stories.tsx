import type { Meta, StoryObj } from '@storybook/react';

import { Loader } from './Loader';

const meta: Meta<typeof Loader> = {
    title: 'Example/Loader',
    component: Loader,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BaseLoader: Story = {
    args: {
        value: 50,
        size: 'm',
        placeholder: 'Загрузка',
    },
    argTypes: {
        size: {
            options: ['xs', 's', 'm'],
            control: {
                type: 'radio',
            },
        },
    },
};
