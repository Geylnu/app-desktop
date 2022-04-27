import { FC } from "react"
import styles from './GridCell.module.scss'
import { useDrop } from 'react-dnd'

interface Props {
    children: React.ReactNode;
}

const GridCell: FC<Props> = (props) => {
    const [collectedProps, drop] = useDrop(() => ({
        accept: 'icon',
    }))


    return <div ref={drop} className={styles.main}>
        {props.children}
    </div>
}


export default GridCell