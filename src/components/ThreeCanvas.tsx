import React, {useEffect} from 'react'
import GameApp from '../game/GameApp';

interface ThreeCanvasProps {
    game: GameApp
}

export function ThreeCanvas(props: ThreeCanvasProps) {
    const {game} = props;
    // Get the actual THREE.js Canvas
    let ref = React.useRef<HTMLCanvasElement>();

    useEffect(() => {
        ref.current.replaceWith(game.getRenderer().domElement);
        const onWindowResize = () => {
            const camera = game.getCamera();
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            game.getRenderer().setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', onWindowResize, false);
    }, [game]);

    return <canvas ref={ref as React.MutableRefObject<HTMLCanvasElement>}/>;
};
