import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import Canvas from './Canvas';

export default class OrbitControlsInputController {
    controls: OrbitControls;

    constructor(canvas: Canvas) {
        this.controls = new OrbitControls(canvas.getCamera(), canvas.getRenderer().domElement);
    }

    handleControl(): void {
        this.controls.update();
    }
}