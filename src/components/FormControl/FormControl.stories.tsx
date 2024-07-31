import * as React from 'react';
import type { Meta } from '@storybook/react';

import { nullable } from '../../utils';

import s from './FormControl.module.css';
import { FormControl, FormControlError, FormControlInput, FormControlLabel } from './FormControl';

const meta: Meta<typeof FormControl> = {
    title: 'Example/FormControl',
    component: FormControl,
};

export default meta;

const Default = () => {
    return (
        <FormControl style={{ marginBottom: 40 }}>
            <FormControlLabel className={s.label}>Email</FormControlLabel>
            <FormControlInput placeholder="email@example.com" />
        </FormControl>
    );
};

const ErrorControl = () => {
    const [value, setValue] = React.useState('');

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <FormControl style={{ marginBottom: 20 }} className={s.wrapper}>
                    <FormControlLabel className={s.label}>Write 4 symbols</FormControlLabel>
                    <FormControlInput
                        placeholder="email@example.com"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                    {nullable(value.length < 4 && { message: 'Some error' }, (error) => (
                        <FormControlError className={s.error} error={error} />
                    ))}
                </FormControl>
                <FormControl style={{ marginBottom: 20 }} className={s.wrapper}>
                    <FormControlLabel className={s.label}>Email</FormControlLabel>
                    <FormControlInput placeholder="email@example.com" />
                    <FormControlError className={s.error}>Some error</FormControlError>
                </FormControl>
            </div>
        </>
    );
};

export const AllControls = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Default />
            <ErrorControl />
        </div>
    );
};

export { Default, ErrorControl };
