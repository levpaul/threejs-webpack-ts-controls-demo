import {Vector3, Clock, Camera} from 'three';
import {PointerLockControls} from 'three/examples/jsm/controls/PointerLockControls';
import Stats from "three/examples/jsm/libs/stats.module";

const clock = new Clock();
const moveAccel = 50.0;

interface ControlConfig {
    camera: Camera;
    renderDom: HTMLElement;
    gameContainer: HTMLElement;
}

export class InputController {
    cfg: ControlConfig;
    plc: PointerLockControls;

    velocity: Vector3 = new Vector3();
    direction: Vector3 = new Vector3();
    moveForward: boolean = false;
    moveBackward: boolean = false;
    moveLeft: boolean = false;
    moveRight: boolean = false;
    moveUp: boolean = false;
    moveDown: boolean = false;
    isLocked: boolean = false;


    // @ts-ignore
    stats: Stats = new Stats();
    statsEnabled: boolean = false;

    blocker: HTMLElement;
    instructions: HTMLElement;

    constructor(config: ControlConfig) {
        this.cfg = config;
        this.plc = new PointerLockControls(config.camera, config.renderDom);

        this.blocker = document.getElementById('blocker');
        this.instructions = document.getElementById('instructions');

        this.instructions.addEventListener('click', () => this.plc.lock());
        this.plc.addEventListener('lock', () => this.lock());
        this.plc.addEventListener('unlock', () => this.unlock());

        document.addEventListener('mousedown', e => this.onMouseDown(e));
        document.addEventListener('mouseup', e => this.onMouseUp(e));
        document.addEventListener('keydown', e => this.onKeyDown(e));
        document.addEventListener('keyup', e => this.onKeyUp(e));
    }

    lock() {
        this.instructions.style.display = 'none';
        this.blocker.style.display = 'none';
        this.isLocked = true;
    }

    unlock() {
        this.blocker.style.display = 'block';
        this.instructions.style.display = '';
        this.isLocked = false;
    }

    handleControl() {
        if (this.isLocked === true) {
            let timeDelta: number = clock.getDelta();
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

    handleStats() {
        if (this.statsEnabled)
            this.stats.update();
    }

    onKeyDown(e: KeyboardEvent) {
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
                console.log("ASDF" + this.statsEnabled)
                this.statsEnabled = !this.statsEnabled;
                if (this.statsEnabled === true) {
                    this.cfg.gameContainer.appendChild(this.stats.dom);
                } else {
                    this.cfg.gameContainer.removeChild(this.stats.dom);
                }
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
}

// Stop ctrl+s from saving ctrl +d from bookmark - doesn't work for ctrl+w exit (use fullscreen for this)
document.addEventListener("keydown", function (e: KeyboardEvent) {
    if ((e.keyCode === 68 || e.keyCode === 83 || e.keyCode === 65) && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
        e.preventDefault();
    }
}, false);

