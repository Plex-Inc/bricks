import React, { useEffect } from 'react';
import type { Decorator, Preview } from '@storybook/react';
import './index.css';

const withTheme: Decorator = (StoryFn, context) => {
    const { theme } = context.globals;

    useEffect(() => {
        const docs = document.querySelector('.docs-story');

        if (docs instanceof HTMLElement) {
            docs.style.backgroundColor = theme === 'dark' ? 'var(--base-background)' : 'var(--text-primary)';
            docs.style.color = theme === 'dark' ? 'var(--text-primary)' : 'var(--base-background)';
            docs.style.fontFamily = 'var(--font-family)';
            return;
        }

        // if it's not a docs story
        const html = document.querySelector('html');

        if (html instanceof HTMLElement) {
            html.style.backgroundColor = theme === 'dark' ? 'var(--base-background)' : 'var(--text-primary)';
            html.style.color = theme === 'dark' ? 'var(--text-primary)' : 'var(--base-background)';
            html.style.fontFamily = 'var(--font-family)';
        }
    }, [theme]);

    return <StoryFn />;
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
