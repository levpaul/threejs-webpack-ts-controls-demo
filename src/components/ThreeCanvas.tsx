import React, { useEffect } from 'react'
import Canvas from '../canvas/Canvas';

interface ThreeCanvasProps {
    canvas: Canvas
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