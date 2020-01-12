import React, {useRef} from 'react';
import HUD from './HUD';
import {ThreeCanvas} from '../ThreeCanvas';
import GameCanvas from '../../game/GameApp';
import DesktopController from '../../controllers/DesktopController';
import Statistics from '../common/Statistics';

interface AppProps {
    canvas: GameCanvas;
}

export default function DesktopApp(props: AppProps) {
    const {canvas} = props;
    const controllerRef = useRef<DesktopController>(new DesktopController(canvas));

    return <>
        <ThreeCanvas canvas={canvas}/>
        <HUD controls={controllerRef.current}/>
        <Statistics/>
    </>
};
