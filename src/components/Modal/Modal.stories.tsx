import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { Button } from '../Button/Button';

import { ModalCloseButton, Modal, ModalHeader, ModalHeaderText } from './Modal';

const meta: Meta<typeof Modal> = {
    title: 'Example/Modal',
    component: Modal,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const BackImg = () => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M5.29083 10.9042L10.0543 15.9297L10.0648 15.94C10.4081 16.2707 10.4104 16.8441 10.0904 17.2229C9.79347 17.5775 9.30663 17.5933 8.99255 17.2616L2.74119 10.6649C2.58527 10.5014 2.50007 10.2563 2.5 10.0001C2.49993 9.74404 2.58534 9.49856 2.74124 9.33504L8.99254 2.73837C9.30669 2.40673 9.79361 2.42257 10.0903 2.77699C10.2365 2.95052 10.3113 3.17495 10.3113 3.40373C10.3113 3.65188 10.2243 3.89258 10.0557 4.06767L10.0543 4.06912L5.29515 9.09587L16.7128 9.09587C17.1291 9.09587 17.5 9.47908 17.5 10C17.5 10.5203 17.1298 10.9042 16.7091 10.9042L5.29083 10.9042Z"
                fill="var(--icons-primary)"
            />
        </svg>
    );
};

const CloseImg = () => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.05716 10L5.52856 6.4714L6.47137 5.52859L9.99997 9.05719L13.5286 5.52859L14.4714 6.4714L10.9428 10L14.4714 13.5286L13.5286 14.4714L9.99997 10.9428L6.47137 14.4714L5.52856 13.5286L9.05716 10Z"
                fill="var(--icons-primary)"
            />
        </svg>
    );
};

const Default: Story = {
    render: () => {
        const [view, setView] = useState(false);
        return (
            <>
                <Button text="Click me" view="ghost" size="l" onClick={() => setView(true)} />
                <Modal isOpen={view} onClose={() => setView(false)}>
                    <ModalHeader>
                        <ModalHeaderText title="Раскрытие меню">
                            <BackImg />
                        </ModalHeaderText>
                        <ModalCloseButton>
                            <span style={{ display: 'flex', alignItems: 'center' }} onClick={() => setView(false)}>
                                <CloseImg />
                            </span>
                        </ModalCloseButton>
                    </ModalHeader>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                        <div style={{ color: '#FFF' }}>open modal</div>
                    </div>
                </Modal>
            </>
        );
    },
};

export { Default };
