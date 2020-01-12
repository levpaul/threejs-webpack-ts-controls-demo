import React, {useEffect} from 'react'
import GameCanvas from '../game/GameApp';

interface ThreeCanvasProps {
    canvas: GameCanvas
}

export function ThreeCanvas(props: ThreeCanvasProps) {
    const {canvas} = props;
    // Get the actual THREE.js Canvas
    let ref = React.useRef<HTMLCanvasElement>();

    useEffect(() => {
        ref.current.replaceWith(canvas.getRenderer().domElement);
        const onWindowResize = () => {
            const camera = canvas.getCamera();
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            canvas.getRenderer().setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', onWindowResize, false);
    }, [canvas]);

    return <canvas ref={ref as React.MutableRefObject<HTMLCanvasElement>}/>;
};
