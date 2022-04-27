import { FC } from "react";
import styles from "./AppIcon.module.scss";
import { RiCloseCircleFill } from "react-icons//ri";

interface Props {
    children: React.ReactNode;
    edit: boolean;
    onClose?: (name: string) => void;
    name: string,
    handleDrop?(from: string, to: string): void; 
}

const AppIcon: FC<Props> = ({ children, edit, onClose, name, handleDrop, ...others }) => {
    const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/plain', name)
    }

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        const data = e.dataTransfer.getData("text/plain");
        if (data && data !== name && handleDrop) {
            handleDrop(name,data)
        }
    }

    const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        console.log('enter', e)
    }

    const ondragover = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        console.log('over', e)
    }



    return <div draggable={edit ? "true" : "false"} onDragStart={onDragStart} onDrop={onDrop} onDragEnter={onDragEnter} onDragOver={ondragover} className={`${styles.icon} ${edit ? styles.animation : ''}`} {...others}>
        {children}
        {edit ? <RiCloseCircleFill onClick={() => onClose && onClose(name)} className={styles.close} /> : null}
    </div>
}

export default AppIcon;