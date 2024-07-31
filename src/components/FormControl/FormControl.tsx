import React, {
    ComponentProps,
    HTMLAttributes,
    MutableRefObject,
    PropsWithChildren,
    ReactNode,
    createContext,
    forwardRef,
    useCallback,
    useContext,
    useEffect,
    useId,
    useMemo,
    useRef,
    useState,
} from 'react';

import { Input } from '../Input/Input';
import { Text } from '../Text/Text';
import { nullable } from '../../utils';

interface FormControlContext {
    id?: string;
    error?: {
        message?: ReactNode;
    };
    popupRef: MutableRefObject<HTMLDivElement | null>;
    handleError: (error: { message?: ReactNode } | undefined) => void;
}

const FormControlContext = createContext<FormControlContext | void>(undefined);

const useFormControlContext = () => {
    const formContext = useContext(FormControlContext);

    if (!formContext) {
        throw new Error("Don't use before initialization or outside of `FormControl` component");
    }

    return formContext;
};

interface FormControlProps extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {}

export const FormControl = ({ children, ...props }: FormControlProps) => {
    const [error, setError] = useState<{ message?: ReactNode } | undefined>();
    const popupRef = useRef<HTMLDivElement | null>(null);
    const id = useId();

    const handleError = useCallback((error: { message?: ReactNode } | undefined) => {
        setError(error);
    }, []);

    const ctx = useMemo(() => ({ id, error, popupRef, handleError }), [id, error, popupRef, handleError]);

    return (
        <FormControlContext.Provider value={ctx}>
            <div {...props}>{children}</div>
        </FormControlContext.Provider>
    );
};

interface FormControlInputProps extends ComponentProps<typeof Input> {}

export const FormControlInput = forwardRef<HTMLInputElement, FormControlInputProps>(({ size = 's', ...props }, ref) => {
    const { id, error, popupRef } = useFormControlContext();

    return (
        <Input
            id={id}
            view={error ? 'error' : 'default'}
            ref={ref}
            size={size}
            forwardedRef={popupRef}
            pointerEvents="none"
            {...props}
        />
    );
});

interface FormControlLabelProps extends Omit<ComponentProps<typeof Text>, 'as'> {}

export const FormControlLabel = ({ ...props }: FormControlLabelProps) => {
    const { id } = useFormControlContext();
    return <Text id={id} as="label" {...props} />;
};

interface FormControlErrorProps extends Omit<ComponentProps<typeof Text>, 'as'> {
    error?: NonNullable<FormControlContext['error']>;
}

export const FormControlError = ({ children, error, ...props }: FormControlErrorProps) => {
    const { popupRef, handleError } = useFormControlContext();

    useEffect(() => {
        if (error) {
            handleError(error);
        } else {
            handleError({ message: children });
        }

        return () => {
            handleError(undefined);
        };
    }, [children, error, handleError]);

    if (error && children) {
        throw new Error("FormControlError: Both 'error' and 'children' props are provided. Only one should be used.");
    }

    return (
        <Text as={'div'} ref={popupRef} {...props}>
            {nullable(error, ({ message }) => message, children)}
        </Text>
    );
};
