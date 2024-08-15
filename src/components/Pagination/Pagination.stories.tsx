import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
    title: 'Example/Pagination',
    component: Pagination,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BasePagination: Story = {
    args: {
        currentPage: 1,
        totalCount: 50,
        siblingCount: 1,
        onChange: () => {},
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
    },
};

const PagintaionDefault = () => {
    const [currentPage, setCurrentPage] = useState(1);
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <Pagination
                currentPage={currentPage}
                onChange={(value) => setCurrentPage(value)}
                totalCount={50}
                siblingCount={1}
                size="m"
            />
            <Pagination currentPage={1} onChange={() => {}} totalCount={50} siblingCount={1} size="m" disabled />
        </div>
    );
};

export { PagintaionDefault };
