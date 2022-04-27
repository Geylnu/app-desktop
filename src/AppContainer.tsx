import { FC, useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import styles from './AppContainer.module.scss'
import AppIcon from './AppIcon';
import GridCell from './GridCell';
import * as Icons from "react-icons/fc";
import _ from 'lodash';
import AppView from './AppView';
import { useDrag } from '@use-gesture/react'


const IconsList = Object.values(Icons).slice(0, 66);

const AppContainer: FC = () => {
    const [dataSource, setDataSource] = useState(IconsList);
    const AppIconList = useMemo(() => {
        return _.chunk(dataSource, 30)
    }, [dataSource])
    const mainRef = useRef<HTMLDivElement>(null)

    const [layoutWidth, setLayoutWidth] = useState(0)

    useLayoutEffect(() => {
        if (mainRef.current) {
            setLayoutWidth(mainRef.current.clientWidth)
        }
    }, [])
    const width = mainRef.current?.clientWidth || layoutWidth
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

    const handleDrop = (from: string, to: string) => {
        if (!isEdit) return;
        const map = new Map()
        for (const item of dataSource) {
            map.set(item.name, item)
        }
        const nextList = dataSource.map(item => {
            if (item.name === from) {
                return map.get(to)
            }
            if (item.name === to) {
                return map.get(from)
            }

            return item
        })

        setDataSource(nextList)
    }

    return <main className={styles.main} ref={mainRef} {...bind()}>
        {AppIconList.map((icons, index) => {
            return <AppView key={index} style={{ transform: `translateX(calc(${-currentIndex} * 100%))` }}>
                {icons.map((Icon) => {
                    return <GridCell key={Icon.name}>
                        <AppIcon handleDrop={handleDrop} name={Icon.name} onClose={onClose} {...longPressBind()} edit={isEdit} >
                            <Icon />
                        </AppIcon>
                    </GridCell>
                })}
            </AppView>
        })}
        <button onClick={() => setEdit(false)} className={styles.complete}>完成</button>
    </main>
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
            if (first && dx + dy < 1) func();

        },
        { delay: 1000 }
    );
    return bind;
}

export default AppContainer;