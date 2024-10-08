import React from 'react';
import type { Meta } from '@storybook/react';

import { Typography } from '..';

import style from './Table.module.css';
import { Table, TableCell, TableHead, TableRow } from './Table';

const meta: Meta<typeof Table> = {
    title: 'Example/Table',
    component: Table,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};
export default meta;

const TableListDefault = () => {
    const head = [
        {
            content: <Typography.Text as="span">ID</Typography.Text>,
            width: 80,
        },
        {
            content: <Typography.Text as="span">Amount</Typography.Text>,
            width: 100,
        },
        {
            content: <Typography.Text as="span">Active</Typography.Text>,
            width: 100,
        },
    ];
    const rows = [
        {
            content: <span>4738348</span>,
            width: 80,
            className: style.TableCellFull,
        },
        {
            content: <span style={{ display: 'flex', whiteSpace: 'nowrap' }}>52,68 USDT</span>,
            width: 100,
            className: style.TableCellFull,
        },
        {
            content: <span>Активный</span>,
            width: 100,
            className: style.TableCellFull,
        },
    ];

    return (
        <Table>
            <TableHead>
                {head.map((cell, index) => {
                    return (
                        <TableCell key={index} width={`${cell.width}px`}>
                            {cell.content}
                        </TableCell>
                    );
                })}
            </TableHead>
            {[...new Array(2)].map((obj) => (
                <TableRow key={obj}>
                    {rows.map((listItem, index) => {
                        return (
                            <TableCell key={index} width={listItem.width} className={listItem.className}>
                                {listItem.content}
                            </TableCell>
                        );
                    })}
                </TableRow>
            ))}
        </Table>
    );
};

export { TableListDefault };
