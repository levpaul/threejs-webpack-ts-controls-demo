import React, {useEffect, useState} from 'react'
import Stats from "three/examples/jsm/libs/stats.module";
import useStore, {AddAnimationHandler} from '../../utils/store';

export function Statistics() {
    const {showStats} = useStore(state => state);
    const statsRef = React.useRef(null);
    const [stats, setStats] = useState();

    useEffect(() => {
        // @ts-ignore
        const newStats = new Stats();
        setStats(newStats); // This is async?
        AddAnimationHandler({name: "stats-update", handle: () => {newStats.update()}});
    }, []);

    if (stats && statsRef)
        if (showStats)
            statsRef.current.appendChild(stats.dom);
        else
            statsRef.current.innerHTML = "";

    let s = {
        display: "inline",
        position: "absolute",
    };

    return <div ref={statsRef}/>
};
