import React, {useEffect, useState} from 'react'
import Stats from "three/examples/jsm/libs/stats.module";
import useStore, {AddAnimationHandler} from '../../utils/store';

export function Statistics() {
    const {showStats} = useStore(state => state);
    const statsRef = React.useRef(null);
    // @ts-ignore
    const [stats, setStats] = useState(new Stats());

    useEffect(() => {
        AddAnimationHandler({
            name: "stats-update", handle: () => {
                stats.update()
            }
        });
    }, []);

    if (stats && statsRef.current)
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
