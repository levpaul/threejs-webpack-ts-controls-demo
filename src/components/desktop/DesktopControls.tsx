import React from "react";
import useStore from '../../utils/store';

interface DesktopControlsProps {
    setPointerLocked: () => void;
    pointerLocked: boolean
}

export default function DesktopControls(props: DesktopControlsProps) {
<<<<<<< HEAD:src/components/DesktopApp/DesktopControls.tsx
    const {pointerLocked} = useStore(s => s.pointerLocked);

    if (!pointerLocked)
        return <div id="blocker" style={{display: "block"}} onClick={setPointerLocked}>
            <div id="instructions">
                <span style={{fontSize: 36 + 'px'}}>Click to play</span>
                <br/><br/>
                Move: WASD<br/>
                Jump: SPACE<br/>
                Look: MOUSE
            </div>
        </div>
    return null
=======
    const {setPointerLocked, pointerLocked} = props;

    return <div id="blocker" onClick={setPointerLocked} style={{display: pointerLocked ? "none" : "block"}}>
        <div id="instructions" style={{display: pointerLocked ? "none" : ""}}>
            <span style={{fontSize: 36 + 'px'}}>Click to play</span>
            <br/><br/>
            Move: WASD<br/>
            Jump: SPACE<br/>
            Look: MOUSE
        </div >
    </div>
>>>>>>> stats:src/components/desktop/DesktopControls.tsx
};
