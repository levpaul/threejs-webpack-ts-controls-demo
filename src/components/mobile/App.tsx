import React, {useEffect} from 'react';
import {ThreeCanvas} from '../ThreeCanvas';
import GameApp from '../../game/GameApp';
import MobileController from '../../controllers/MobileController';
import {AddAnimationHandler} from "../../utils/Store";

interface AppProps {
    game: GameApp;
}

export default function MobileApp(props: AppProps) {
    const {game} = props;

    useEffect(() => {
        const controller = new MobileController(game);
        AddAnimationHandler({name: 'controls', handle: () => controller.handleControl()});
    }, [game]);

    return <ThreeCanvas game={game}/>
};
