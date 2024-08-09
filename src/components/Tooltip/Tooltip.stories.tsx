import * as React from 'react';
import type { Meta } from '@storybook/react';

import { Button } from '../Button/Button';
import { Text } from '../Text/Text';

import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
    title: 'Example/Tooltip',
    component: Tooltip,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};
export default meta;

export const TooltipDefault = () => {
    const ref = React.useRef(null);
    return (
        <div style={{ height: 80 }}>
            <Button ref={ref} text="reference" />
            <Tooltip visible reference={ref} placement="bottom" interactive>
                fsfsfd
            </Tooltip>
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

const ShownTooltip = ({
    placement,
    view,
}: {
    placement: React.ComponentProps<typeof Tooltip>['placement'];
    view?: React.ComponentProps<typeof Tooltip>['view'];
}) => {
    const ref = React.useRef(null);

    return (
        <div>
            <Button text="open" ref={ref} />
            <Tooltip visible reference={ref} view={view} placement={placement} interactive maxWidth={260}>
                <Text>Если выбрать только год, то датой будет выбран конец года, например: 31.12.2023</Text>
            </Tooltip>
        </div>
    );
};

const Tooltips = () => {
    return (
        <Layout gap={160}>
            <ShownTooltip placement="left" />
            <ShownTooltip placement="top" />
            <ShownTooltip placement="bottom" />
            <ShownTooltip placement="right" />
        </Layout>
    );
};

const TooltipsView = () => {
    return (
        <Layout gap={160}>
            <ShownTooltip view="default" placement="left" />
            <ShownTooltip view="danger" placement="top" />
            <ShownTooltip view="success" placement="bottom" />
            <ShownTooltip view="warning" placement="right" />
        </Layout>
    );
};

export { Tooltips, TooltipsView };
