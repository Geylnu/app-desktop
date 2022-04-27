import { FC } from "react";
import styles from './AppView.module.scss';

interface Props extends React.HTMLAttributes<HTMLElement>{
    children: React.ReactNode;
}

const AppView: FC<Props> = ({children, ...others}) => {
    return <main className={styles.main} {...others}>
        {children}
    </main>
}

export default AppView;