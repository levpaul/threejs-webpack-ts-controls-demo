import React, {useRef} from 'react';
import GameCanvas from '../canvas/GameCanvas';
import MobileApp from './mobile';
import DesktopApp from './desktop';
import {isMobile} from '../utils/helpers';
import useStore from '../utils/store';

export default function App() {
    const mobile = isMobile();
    const canvasRef = useRef<GameCanvas>(new GameCanvas());
    // let stats = useStore(s => s.showStats);

    return mobile ? <MobileApp canvas={canvasRef.current}/> :
        <DesktopApp canvas={canvasRef.current}/>
};
