import cn from 'classnames';
import React, { ChangeEvent } from 'react';

import s from './SwitchTheme.module.css';

// TODO: add Icon from icons lib
function MoonIcon({ className }: { className: string }) {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 15 16"
            fill="none"
        >
            <path
                d="M1.55029 11.6044C1.95367 11.6889 2.37178 11.7333 2.80027 11.7333C6.15079 11.7333 8.86693 9.01721 8.86693 5.66668C8.86693 4.03784 8.22501 2.55892 7.18033 1.46912C10.7053 1.56452 13.5336 4.45198 13.5336 8.00001C13.5336 11.6083 10.6085 14.5333 7.00024 14.5333C4.72419 14.5333 2.71999 13.3695 1.55029 11.6044Z"
                stroke="#6E6E7A"
                strokeLinejoin="round"
            />
        </svg>
    );
}

// TODO: add Icon from icons lib
function SunIcon({ className }: { className: string }) {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 13 12"
            fill="none"
        >
            <path
                d="M6.5 1.4995V0.75M6.5 11.2431V10.4936M11 5.99657H11.75M2 5.99657H1.25M2.75 2.24899L2 1.4995M11 1.4995L10.25 2.24899M2.75 9.74409L2 10.4936M11 10.4936L10.25 9.74409M8.75 5.99657C8.75 7.23851 7.74275 8.2451 6.5 8.2451C5.25725 8.2451 4.25 7.23851 4.25 5.99657C4.25 4.75463 5.25725 3.74803 6.5 3.74803C7.74275 3.74803 8.75 4.75463 8.75 5.99657Z"
                stroke="#F0A72F"
                strokeLinecap="square"
            />
        </svg>
    );
}

interface SwitchThemeProps {
    value: 'light' | 'dark';
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const SwitchTheme = ({ value, onChange }: SwitchThemeProps) => {
    return (
        <label className={s.Wrapper}>
            <input type="checkbox" style={{ display: 'none' }} checked={value === 'light'} onChange={onChange} />
            <span className={s.Box}>
                <SunIcon className={cn(s.SunIcon_left)} />
                <MoonIcon className={cn(s.MoonIcon_right)} />
                <div
                    className={cn(s.Checked, {
                        [s.LightChecked]: value === 'dark',
                    })}
                >
                    <MoonIcon
                        className={cn(s.Icon, s.MoonIcon_checked, {
                            [s.Icon_none]: value === 'light',
                        })}
                    />
                    <SunIcon
                        className={cn(s.Icon, s.SunIcon_checked, {
                            [s.Icon_none]: value === 'dark',
                        })}
                    />
                </div>
            </span>
        </label>
    );
};
