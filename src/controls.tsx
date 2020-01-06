import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {PointerLockControls} from "three/examples/jsm/controls/PointerLockControls";
import Stats from "three/examples/jsm/libs/stats.module";
import React, {useState} from "react";

const clock = new THREE.Clock();
const moveAccel = 50.0;

export let controller: InputController;

export const Controls = (cCfg: ControlConfig) => {
    if (cCfg.isMobile) {
        if (controller == null) {
            controller = new OrbitControlsInputController(cCfg);
        }
        return null;
    } else {
        const [pointerLocked, setPointerLocked] = useState(false);
        if (controller == null) {
            controller = new PointerLockInputController(cCfg);
            controller.plc.addEventListener("unlock", () => {
                setPointerLocked(false);
            });
        }
        controller.isLocked = pointerLocked;
        if (pointerLocked) {
            controller.plc.lock();
        }

        return <>
            <div id="blocker" style={{display: pointerLocked ? "none" : "block"}}>
                <div id="instructions" onClick={() => {
                    setPointerLocked(!pointerLocked)
                }} style={{display: pointerLocked ? "none" : ""}}>
                    <span style={{fontSize: 36 + 'px'}}>Click to play</span>
                    <br/><br/>
                    Move: WASD<br/>
                    Jump: SPACE<br/>
                    Look: MOUSE
                </div>
            </div>
        </>
    }
};

interface ControlConfig {
    camera: THREE.Camera;
    renderDom: HTMLElement;
    isMobile: boolean;
}

export interface InputController {
    handleControl(): void;

    plc?: PointerLockControls;
    isLocked?: boolean;
}

class OrbitControlsInputController {
    controls: OrbitControls;

    constructor(config: ControlConfig) {
        this.controls = new OrbitControls(config.camera, config.renderDom);
    }

    handleControl(): void {
        this.controls.update();
    }
}

class PointerLockInputController {
    cfg: ControlConfig;
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

    // @ts-ignore
    stats: Stats = new Stats();
    statsEnabled: boolean = false;


    constructor(config: ControlConfig) {
        this.cfg = config;
        this.plc = new PointerLockControls(config.camera, config.renderDom);

        document.addEventListener('mousedown', e => this.onMouseDown(e));
        document.addEventListener('mouseup', e => this.onMouseUp(e));
        document.addEventListener('keydown', e => this.onKeyDown(e));
        document.addEventListener('keyup', e => this.onKeyUp(e));
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

        // TODO: Remove this from controller and put into its own class/module
        if (this.statsEnabled)
            this.stats.update();
    }

    onKeyDown(e: KeyboardEvent) {
        // Stop ctrl+s from saving ctrl +d from bookmark - doesn't work for ctrl+w exit (use fullscreen for this)
        if ((e.keyCode === 68 || e.keyCode === 83 || e.keyCode === 65) && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
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
                this.statsEnabled = !this.statsEnabled;
                console.log("Stats go here but are disbaled atm")
                // if (this.statsEnabled) {
                //     this.cfg.gameContainer.appendChild(this.stats.dom);
                // } else {
                //     this.cfg.gameContainer.removeChild(this.stats.dom);
                // }
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


