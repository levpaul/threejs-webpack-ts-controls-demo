import React, {useEffect} from 'react'
import Stats from "three/examples/jsm/libs/stats.module";
import useStore, {AddAnimationHandler} from '../../utils/Store';

export const Statistics = () => {
    const showStats = useStore(state => state.showStats);
    // @ts-ignore
    const threeStats = React.useRef(new Stats());
    const statsRef = React.useRef(null);

    useEffect(() => {
        AddAnimationHandler({
            name: "stats-update", handle: () => {
                threeStats.current.update()
            }
        });
    }, []);

    if (statsRef.current)
        if (showStats)
            statsRef.current.appendChild(threeStats.current.dom);
        else
            statsRef.current.innerHTML = "";

    return <div ref={statsRef}/>
};

export default Statistics;
