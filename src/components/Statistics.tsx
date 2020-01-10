import React, { useEffect } from 'react'
import Stats from "three/examples/jsm/libs/stats.module";

interface StatsProps {
    statsel: Stats
}

export function Statistics(props: StatsProps) {
    const { statsel } = props;
    // Get the actual THREE.js Canvas
    let ref = React.useRef<HTMLDivElement>();
    useEffect(() => {
        ref.current.replaceWith(statsel.domElement);
    }, [statsel]);

    return <div ref={ref as React.MutableRefObject<HTMLDivElement>}/>;
};
       // if (this.statsEnabled) {
        //     this.cfg.gameContainer.appendChild(this.stats.dom);
        // } else {
        //     this.cfg.gameContainer.removeChild(this.stats.dom);
        // }import React from "react";
