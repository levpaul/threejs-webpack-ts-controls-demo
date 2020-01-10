import React, { useEffect } from 'react'
import GameCanvas from '../canvas/GameCanvas';

interface ThreeCanvasProps {
    canvas: GameCanvas
}

export function ThreeCanvas(props: ThreeCanvasProps) {
    const { canvas } = props;
    // Get the actual THREE.js Canvas
    let ref = React.useRef<HTMLCanvasElement>();
    useEffect(() => {
        ref.current.replaceWith(canvas.getRenderer().domElement);
    }, [canvas]);

    return <canvas ref={ref as React.MutableRefObject<HTMLCanvasElement>}/>;
};
