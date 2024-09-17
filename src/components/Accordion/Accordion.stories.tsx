import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { Accordion, AccordionTable } from './Accordion';

const meta: Meta<typeof Accordion> = {
    title: 'Example/Accordion',
    component: Accordion,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        size: 'm',
        leftIcon: true,
        title: 'Не могут зарегестрироваться в ЛК',
    },
    argTypes: {
        size: {
            options: ['s', 'm', 'l'],
            control: {
                type: 'radio',
            },
        },
    },
};

const DefaultAccordion = () => {
    const [active, setActive] = useState('');
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
            }}
        >
            <AccordionTable active={active} onChange={setActive}>
                <Accordion title={'Не могут зарегестрироваться в ЛК'} name="1" size="m" leftIcon>
                    Если с момента создания ЛК прошло более 24 часов - зарегестирироваться не получится. Необходимо
                    написать в чат интеграции о необходимости обновить ссылку на ЛК
                </Accordion>
                <Accordion
                    title={
                        'Create_payout защищен от дублей на вашей стороне? Ретрай можно делать? Если да, через сколько?'
                    }
                    name="2"
                    size="m"
                    leftIcon
                >
                    Защищено. Ретраи делать нет смысла - будет отбиваться по уже существующему ключу
                </Accordion>
                <Accordion title={'Система callback'} name="3" size="m" leftIcon>
                    Правила работы с коллбэками - мы им не доверяем.
                </Accordion>
            </AccordionTable>
        </div>
    );
};

export { DefaultAccordion };
