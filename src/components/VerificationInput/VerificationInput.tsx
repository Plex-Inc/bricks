import React, {
    InputHTMLAttributes,
    MutableRefObject,
    forwardRef,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import cn from 'classnames';

import { nullable } from '../../utils';

import s from './VerificationInput.module.css';

const viewMap = {
    default: s.DefaultInput,
    error: s.ErrorInput,
    success: s.SuccessInput,
};

const sizeMap = {
    s: s.Input_size_s,
    m: s.Input_size_m,
    l: s.Input_size_l,
};

interface VerificationInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    forwardedRef?: MutableRefObject<HTMLDivElement | null>;
    className?: string;
    id?: string;
    placeholder?: string;
    type?: string;
    view?: keyof typeof viewMap;
    size?: keyof typeof sizeMap;
}

interface VerificationInputBox extends Omit<VerificationInputProps, 'onChange'> {
    className?: string;
    label?: string;
    length?: number;
    onChange: (value: string) => void;
}

export const Input = forwardRef<HTMLInputElement, VerificationInputProps>(
    ({ className, id, type, view = 'default', size = 's', placeholder, forwardedRef, ...rest }) => {
        return (
            <div ref={forwardedRef}>
                <input
                    type={type}
                    className={cn(s.VerificationInput, viewMap[view], sizeMap[size], className)}
                    id={id}
                    placeholder={placeholder}
                    {...rest}
                />
            </div>
        );
    },
);

export const VerificationInput: React.FC<React.PropsWithChildren<VerificationInputBox>> = ({
    className,
    label,
    length = 6,
    onChange,
    type = 'text',
    view = 'default',
    size = 's',
}) => {
    const boxRef = useRef<HTMLDivElement | null>(null);
    const arrayString = Array(length).fill('');
    const [code, setCode] = useState<string[]>(arrayString);

    const focusInput = useCallback(
        (index: number) => {
            const inputElement = boxRef.current?.querySelector(`#totp-input-${index}`);
            if (inputElement instanceof HTMLInputElement) {
                inputElement.focus();
            }
        },
        [boxRef, onChange, code],
    );

    const handleChange = useCallback(
        (index: number, value: string) => {
            const newCode = [...code];
            const valueNumber = value.replace(/[^0-9]/g, '');
            newCode[index] = valueNumber;
            setCode(newCode);

            if (valueNumber.length === 1) {
                const nextIndex = Math.min(index + 1, length - 1);
                focusInput(nextIndex);
            }

            if (!valueNumber.length) {
                const backIndex = Math.max(index - 1, 0);
                focusInput(backIndex);
            }

            onChange(newCode.join(''));
        },
        [boxRef, code, onChange],
    );

    const handlePaste = useCallback(
        (event: React.ClipboardEvent<HTMLDivElement>) => {
            event.preventDefault();

            const pastedText = event.clipboardData.getData('text');
            let pastedNumbers = pastedText.replace(/[^0-9]/g, '');

            if (pastedNumbers.length > length) {
                pastedNumbers = pastedNumbers.substring(0, length);
            }

            const newCode = [...arrayString];
            for (let i = 0; i < pastedNumbers.length; i++) {
                newCode[i] = pastedNumbers[i];
                focusInput(i);
            }
            setCode(newCode);
            onChange(newCode.join(''));
            focusInput(pastedNumbers.length);
        },
        [boxRef],
    );

    useEffect(() => {
        focusInput(0);
        if (!boxRef.current) return;

        boxRef.current.addEventListener('paste', handlePaste as unknown as EventListener);

        return () => {
            if (!boxRef.current) return;
            boxRef.current.removeEventListener('paste', handlePaste as unknown as EventListener);
        };
    }, []);

    return (
        <div className={cn(s.Wrapper, className)}>
            {nullable(label, (t) => (
                <span className={s.Label}>{t}</span>
            ))}
            <div className={s.InputWrapper} ref={boxRef}>
                {code.map((obj, i) => (
                    <Input
                        key={i}
                        size={size}
                        type={type}
                        view={view}
                        placeholder=""
                        value={obj}
                        onChange={(e) => handleChange(i, e.target.value)}
                        maxLength={1}
                        inputMode="numeric"
                        id={`totp-input-${i}`}
                    />
                ))}
            </div>
        </div>
    );
};
