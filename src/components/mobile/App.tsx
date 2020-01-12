import React, {useEffect} from 'react';
import {ThreeCanvas} from '../ThreeCanvas';
import GameCanvas from '../../game/GameApp';
import MobileController from '../../controllers/MobileController';
import {AddAnimationHandler} from "../../utils/Store";

interface AppProps {
    canvas: GameCanvas;
}

export default function MobileApp(props: AppProps) {
    const {canvas} = props;

    useEffect(() => {
        const controller = new MobileController(canvas);
        AddAnimationHandler({name: "controls", handle: () => controller.handleControl()});
    }, [canvas]);

    return <ThreeCanvas canvas={canvas}/>
};
