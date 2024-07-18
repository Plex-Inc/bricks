import { createPortal } from 'react-dom';

import { usePortal } from '../../hooks';

interface PortalProps {
    children: React.ReactNode;
    id: string;
}

export const Portal: React.FC<PortalProps> = ({ children, id }) => createPortal(children, usePortal(id));
