import React, { useEffect, useRef, useState } from 'react';
import DesktopControls from './/DesktopControls';
import { ThreeCanvas } from '../ThreeCanvas';
import GameCanvas from '../../canvas/GameCanvas';
import DesktopController from '../../controllers/DesktopController';
import useStore from '../../utils/store';
import {Statistics} from "./Statistics";
import DesktopHUD from "./DesktopHUD";

interface AppProps {
    canvas: GameCanvas;
}

export default function DesktopApp(props: AppProps) {
    const { canvas } = props;

    const [pointerLocked, setPointerLockedState] = useState(false);

    const controllerRef = useRef<DesktopController>(null);

    useEffect(() => {
        const controller = new DesktopController(canvas);

        const onUnlock = () => {
            setPointerLockedState(false);
            controllerRef.current.lock(false);
        };
        controller.plc.addEventListener("unlock", onUnlock);

        // Setup resize listeners
        const onWindowResize = () => {
            const camera = canvas.getCamera();
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            canvas.getRenderer().setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', onWindowResize, false);

        canvas.animate(() => controller.handleControl());

        controllerRef.current = controller;

        return function cleanup() {
<<<<<<< HEAD:src/components/DesktopApp/DesktopApp.tsx
            console.log("fasdf")
            document.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('keydown', onKeyDown);
            document.removeEventListener('keyup', onKeyUp);

=======
>>>>>>> stats:src/components/desktop/App.tsx
            controller.plc.removeEventListener("unlock", onUnlock);
            window.removeEventListener('resize', onWindowResize, false);
        }
    }, [canvas]);

    const setPointerLocked = () => {
        setPointerLockedState(true);
        controllerRef.current.lock(true)
    };

    return <>
        <ThreeCanvas canvas={canvas} />
        <DesktopControls pointerLocked={pointerLocked} setPointerLocked={setPointerLocked} />
        <Statistics />
        </>
    };
