import React, {useRef} from 'react';
import GameApp from '../game/GameApp';
import MobileApp from './mobile';
import DesktopApp from './desktop';

export default function App() {
    console.log("Main render")
    const mobile: boolean = /mobile/i.test(window.navigator.userAgent);
    const gameRef = useRef<GameApp>(new GameApp());

    return mobile ? <MobileApp game={gameRef.current}/> :
        <DesktopApp game={gameRef.current}/>
};
