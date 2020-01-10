import React, { useEffect, useRef, useState } from 'react';
import DesktopControls from '../DesktopApp/DesktopControls';
import { ThreeCanvas } from '../ThreeCanvas';
import GameCanvas from '../../canvas/GameCanvas';
import PointerLockInputController from '../../canvas/PointerLockInputController';
import useStore from '../../utils/store';
import {Statistics} from "../Statistics";

interface AppProps {
    canvas: GameCanvas;
}

export default function DesktopApp(props: AppProps) {
    const { canvas } = props;

    const [pointerLocked, setPointerLockedState] = useState(false);

    const controllerRef = useRef<PointerLockInputController>(null);

    useEffect(() => {
        const controller = new PointerLockInputController(canvas);

        const onMouseDown = (e: MouseEvent) => controller.onMouseDown(e);
        const onMouseUp = (e: MouseEvent) => controller.onMouseUp(e);
        const onKeyDown = (e: KeyboardEvent) => controller.onKeyDown(e);
        const onKeyUp = (e: KeyboardEvent) => controller.onKeyUp(e);
        document.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mouseup', onMouseUp);
        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('keyup', onKeyUp);

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
            console.log("fasdf")
            document.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('keydown', onKeyDown);
            document.removeEventListener('keyup', onKeyUp);

            controller.plc.removeEventListener("unlock", onUnlock);
            window.removeEventListener('resize', onWindowResize, false);
        }
    }, [canvas]);

    const setPointerLocked = () => {
        setPointerLockedState(true);
        controllerRef.current.lock(true)
    };

    return <>
        <DesktopControls setPointerLocked={setPointerLocked} pointerLocked={pointerLocked}/>
        <ThreeCanvas canvas={canvas} />
        </>
    };
