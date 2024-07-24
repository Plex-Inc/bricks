import React from 'react';
import type { Decorator, Preview } from '@storybook/react';
import './index.css';

const withTheme: Decorator = (StoryFn, context) => {
    const { theme } = context.globals;

    return (
        <div
            style={{
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: theme === 'dark' ? '#161616' : '#fff',
            }}
        >
            <StoryFn />
        </div>
    );
};

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    decorators: [withTheme],
};

export default preview;

export const globalTypes = {
    theme: {
        name: 'Theme',
        description: 'Global theme for components',
        defaultValue: 'dark',
        toolbar: {
            icon: 'circlehollow',
            items: [
                { value: 'light', icon: 'circlehollow', title: 'light' },
                { value: 'dark', icon: 'circle', title: 'dark' },
            ],
            showName: true,
        },
    },
};
