import React, {useRef} from 'react';
import GameCanvas from '../game/GameApp';
import MobileApp from './mobile';
import DesktopApp from './desktop';
import {isMobile} from '../utils/helpers';

export default function App() {
    const mobile = isMobile();
    const canvasRef = useRef<GameCanvas>(new GameCanvas());

    return mobile ? <MobileApp canvas={canvasRef.current}/> :
        <DesktopApp canvas={canvasRef.current}/>
};
