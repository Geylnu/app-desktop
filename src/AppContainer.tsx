import { FC, useCallback, useMemo, useRef, useState } from "react";
import styles from './AppContainer.module.scss'
import AppIcon from './AppIcon';
import GridCell from './GridCell';
import * as Icons from "react-icons/fc";
import _ from 'lodash';
import AppView from './AppView';
import { useDrag } from '@use-gesture/react'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

const IconsList = Object.values(Icons).slice(0, 66);

const AppContainer: FC = () => {
    const [dataSource, setDataSource] = useState(IconsList);
    const AppIconList = useMemo(() => {
        return _.chunk(dataSource, 30)
    }, [dataSource])
    const mainRef = useRef<HTMLDivElement>(null)
    const width = mainRef.current?.clientWidth || 0
    const [currentIndex, setIndex] = useState(0)
    const [isEdit, setEdit] = useState(false)
    const longPressBind = useLongPress(() => {
        if (!isEdit) setEdit(true)
    })

    const bind = useDrag(({ active, movement: [mx], direction: [xDir], cancel }) => {
        if (active && Math.abs(mx) > width / 3) {
            const nextIndex = _.clamp(currentIndex + (xDir > 0 ? -1 : 1), 0, AppIconList.length - 1)
            setIndex(nextIndex)
            cancel()
        }
    })

    const onClose = useCallback((name: string) => {
        setDataSource(dataSource.filter(item => item.name !== name))
    }, [dataSource])

    return <DndProvider backend={HTML5Backend}><main className={styles.main} ref={mainRef} {...bind()}>
        {AppIconList.map((icons, index) => {
            return <AppView key={index} style={{ transform: `translateX(calc(${-currentIndex} * 100%))` }}>
                {icons.map((Icon) => {
                    return <GridCell key={Icon.name}>
                        <AppIcon name={Icon.name} onClose={onClose} {...longPressBind()} edit={isEdit} >
                            <Icon />
                        </AppIcon>
                    </GridCell>
                })}
            </AppView>
        })}
        <button onClick={() => setEdit(false)} className={styles.complete}>完成</button>
    </main></DndProvider >
}


const useLongPress = (func: () => void) => {
    const bind = useDrag(
        ({
            first,
            distance: [dx, dy],
            active,
            movement: [x, y],
            swipe: [sx, sy]
        }) => {
            console.log({ first });
            if (first && dx + dy < 3) func();

        },
        { delay: 2000 }
    );
    return bind;
}

export default AppContainer;