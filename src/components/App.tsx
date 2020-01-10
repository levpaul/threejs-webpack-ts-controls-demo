import React, {useRef} from 'react';
import GameCanvas from '../canvas/GameCanvas';
import MobileApp from './MobileApp';
import DesktopApp from './DesktopApp';
import {isMobile} from '../utils/helpers';


export default function App() {
    const mobile = isMobile();
    const canvasRef = useRef<GameCanvas>(new GameCanvas());

    return mobile ?
        <MobileApp canvas={canvasRef.current}/> :
        <DesktopApp canvas={canvasRef.current}/>
};
