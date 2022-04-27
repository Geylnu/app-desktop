import { FC } from "react"
import styles from './GridCell.module.scss'
interface Props {
    children: React.ReactNode;
}

const GridCell: FC<Props> = (props) => {

    return <div className={styles.main}>
        {props.children}
    </div>
}


export default GridCell