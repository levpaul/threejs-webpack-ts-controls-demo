import * as THREE from 'three'
import {PointerLockControls} from 'three/examples/jsm/controls/PointerLockControls';
import GameCanvas from '../game/GameApp';
import {AddAnimationHandler, HUDActions, SetRandom} from "../utils/Store";

const clock = new THREE.Clock();
const moveAccel = 50.0;

export default class DesktopController {
    plc: PointerLockControls;

    velocity: THREE.Vector3 = new THREE.Vector3();
    direction: THREE.Vector3 = new THREE.Vector3();
    moveForward: boolean = false;
    moveBackward: boolean = false;
    moveLeft: boolean = false;
    moveRight: boolean = false;
    moveUp: boolean = false;
    moveDown: boolean = false;
    isLocked: boolean = false;


    constructor(canvas: GameCanvas) {
        this.plc = new PointerLockControls(canvas.getCamera(), canvas.getRenderer().domElement);

        document.addEventListener('mousedown', e => this.onMouseDown(e));
        document.addEventListener('mouseup', e => this.onMouseUp(e));
        document.addEventListener('keydown', e => this.onKeyDown(e));
        document.addEventListener('keyup', e => this.onKeyUp(e));

        AddAnimationHandler({name: "controls", handle: () => this.handleControl()});
    }

    handleControl() {
        let timeDelta: number = clock.getDelta();
        if (this.isLocked) {
            this.velocity.x -= this.velocity.x * 10.0 * timeDelta;
            this.velocity.y -= this.velocity.y * 10.0 * timeDelta;
            this.velocity.z -= this.velocity.z * 10.0 * timeDelta;

            this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
            this.direction.x = Number(this.moveRight) - Number(this.moveLeft);
            this.direction.y = Number(this.moveDown) - Number(this.moveUp);
            this.direction.normalize(); // this ensures consistent movements in all directions - does it??

            if (this.moveForward || this.moveBackward) this.velocity.z -= this.direction.z * moveAccel * timeDelta;
            if (this.moveLeft || this.moveRight) this.velocity.x -= this.direction.x * moveAccel * timeDelta;
            if (this.moveUp || this.moveDown) this.velocity.y -= this.direction.y * moveAccel * timeDelta;

            this.plc.moveRight(-this.velocity.x * timeDelta);
            this.plc.moveForward(-this.velocity.z * timeDelta);
            this.plc.getObject().position.y += this.velocity.y * timeDelta;
        }
    }

    onKeyDown(e: KeyboardEvent) {
        // console.log("KEYeve")
        // Stop ctrl+s from saving ctrl +d from bookmark - doesn't work for ctrl+w exit (use fullscreen for this)
        if ((e.keyCode === 68 || e.keyCode === 83 || e.keyCode === 65) && (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)) {
            e.preventDefault();
        }

        switch (e.keyCode) {
            case 38: // up
            case 87: // w
                this.moveForward = true;
                break;
            case 37: // left
            case 65: // a
                this.moveLeft = true;
                break;
            case 40: // down
            case 83: // s
                this.moveBackward = true;
                break;
            case 39: // right
            case 68: // d
                this.moveRight = true;
                break;
            case 32: // space
                this.moveUp = true;
                break;
            case 17: // ctrl
                this.moveDown = true;
                break;
            case 73: // i
                HUDActions.toggleStats();
                break;
        }
    }

    onKeyUp(e: KeyboardEvent) {
        switch (e.keyCode) {
            case 38: // up
            case 87: // w
                this.moveForward = false;
                break;
            case 37: // left
            case 65: // a
                this.moveLeft = false;
                break;
            case 40: // down
            case 83: // s
                this.moveBackward = false;
                break;
            case 39: // right
            case 68: // d
                this.moveRight = false;
                break;
            case 32: // space
                this.moveUp = false;
                break;
            case 17: // ctrl
                this.moveDown = false;
                break;
        }
    }

    onMouseDown(e: MouseEvent) {
        switch (e.button) {
            case 0: // left
                this.moveForward = true;
                break;
            case 1: // middle
                break;
            case 2: // right
                this.moveBackward = true;
                break;
        }
    }

    onMouseUp(e: MouseEvent) {
        switch (e.button) {
            case 0: // left
                this.moveForward = false;
                break;
            case 1: // middle
                break;
            case 2: // right
                this.moveBackward = false;
                break;
        }
    }

    lock(pointerLocked: boolean) {
        if (pointerLocked) {
            this.plc.lock();
        } else {
            this.plc.unlock();
        }

        this.isLocked = pointerLocked
    }
}
