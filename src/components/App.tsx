import React, { useRef } from 'react';
import Canvas from '../canvas/Canvas';
import MobileApp from './MobileApp';
import DesktopApp from './DesktopApp/DesktopApp';

interface AppProps {
    isMobile: boolean;
}

export default function App(props: AppProps) {
    const { isMobile } = props;

    const canvasRef = useRef<Canvas>(new Canvas());

    return canvasRef.current ?
        isMobile ?
            <MobileApp canvas={canvasRef.current} /> :
            <DesktopApp canvas={canvasRef.current} /> :
        null;
};