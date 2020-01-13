import React, {useRef} from 'react';
import HUD from './HUD';
import {ThreeCanvas} from '../ThreeCanvas';
import GameApp from '../../game/GameApp';
import DesktopController from '../../controllers/DesktopController';
import Statistics from '../common/Statistics';

interface AppProps {
    game: GameApp
}

export default function DesktopApp(props: AppProps) {
    const {game} = props;
    const controllerRef = useRef<DesktopController>(new DesktopController(game));

    return <>
        <ThreeCanvas game={game}/>
        <HUD controls={controllerRef.current}/>
        <Statistics/>
    </>
};
