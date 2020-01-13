import React, {useEffect, useState} from 'react';
import DesktopController from '../../controllers/DesktopController';

interface HUDProps {
    controls: DesktopController
}

export const HUD = (props: HUDProps) => {
    const [pointerLocked, setPointerLockedState] = useState(false);
    let {controls} = props;

    useEffect(() => {
        const onUnlock = () => {
            setPointerLockedState(false);
            controls.lock(false);
        };
        controls.plc.addEventListener('unlock', onUnlock);

        return function cleanup() {
            controls.plc.removeEventListener('unlock', onUnlock);
        }
    }, [controls]);

    const setPointerLocked = () => {
        setPointerLockedState(true);
        controls.lock(true)
    };

    return pointerLocked ? null : <Instructions pointerLock={setPointerLocked}/>
};

const Instructions = ({pointerLock}) =>
    <div id='blocker' onClick={pointerLock}>
        <div id='instructions'>
            <span style={{fontSize: 36 + 'px'}}>Click to play</span>
            <br/><br/>
            Move: WASD<br/>
            Rise: SPACE<br/>
            Fall: CTRL<br/>
            Look: MOUSE
        </div>
    </div>;

export default HUD;
