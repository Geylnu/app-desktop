import { FC } from "react";
import styles from "./AppIcon.module.scss";
import { RiCloseCircleFill } from "react-icons//ri";
import { useDrag } from 'react-dnd';

interface Props {
    children: React.ReactNode;
    edit: boolean;
    onClose?: (name: string) => void;
    name: string
}

const AppIcon: FC<Props> = ({ children, edit, onClose, name, ...others }) => {
    const [collected, drag] = useDrag(() => ({
        type: 'icon',
        item: { name },
    }));
    return <div ref={drag} className={`${styles.icon} ${edit ? styles.animation : ''}`} {...others}>
        {children}
        {edit ? <RiCloseCircleFill onClick={() => onClose && onClose(name)} className={styles.close} /> : null}
    </div>
}

export default AppIcon;