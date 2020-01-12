import React, {useRef} from 'react';
import GameCanvas from '../game/GameApp';
import MobileApp from './mobile';
import DesktopApp from './desktop';

export default function App() {
    const mobile: boolean = /mobile/i.test(window.navigator.userAgent);
    const canvasRef = useRef<GameCanvas>(new GameCanvas());

    return mobile ? <MobileApp canvas={canvasRef.current}/> :
        <DesktopApp canvas={canvasRef.current}/>
};
