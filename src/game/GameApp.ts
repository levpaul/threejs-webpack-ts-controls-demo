import * as THREE from 'three';
import {getGround} from './Terrain';
import {GetAnimationHandlers} from "../utils/Store";
import {Vector2} from "three";

export interface AnimationHandler {
    name: string

    handle(): void
}

const gameSettings = {
    cameraFOV: 45,
    cameraNear: 0.1,
    cameraFar: 1000,
    cameraHeight: 4,
    fogNear: 49,
    fogFar: 99,
};

export default class GameApp {
    camera: THREE.PerspectiveCamera;
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    raycaster: THREE.Raycaster;

    constructor() {
        // this.scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xa0a0a0);
        this.scene.fog = new THREE.Fog(0xa0a0a0, gameSettings.fogNear, gameSettings.fogFar);

        // Camera
        this.camera = new THREE.PerspectiveCamera(gameSettings.cameraFOV, window.innerWidth / window.innerHeight, gameSettings.cameraNear, gameSettings.cameraFar);
        this.raycaster = new THREE.Raycaster();

        // Terrain
        this.scene.add(getGround());

        // Renderer
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        // Light
        const lights: Array<THREE.Light> = new Array<THREE.Light>();
        lights.push(new THREE.AmbientLight(0xee3333));
        lights.push(new THREE.PointLight(0xffffff, 3, 0));
        lights.push(new THREE.PointLight(0xffffff, 8, 0));
        lights.push(new THREE.PointLight(0xffffff, 4, 0));
        lights[2].position.set(4, 1, 0);
        lights[3].position.set(0, 1, 6);
        for (let l of lights) {
            this.scene.add(l);
        }

        var axesHelper = new THREE.AxesHelper( 5 );
        axesHelper.receiveShadow = false;
        this.scene.add( axesHelper );

        // Final Camera
        this.camera.position.set(-1, gameSettings.cameraHeight, -4);
        this.camera.lookAt(0,0,2);

        // Begin animation
        this.animate();
    }

    getCamera() {
        return this.camera;
    }

    getRenderer() {
        return this.renderer;
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        for (let h of GetAnimationHandlers()) {
            h.handle();
        }

        this.renderer.render(this.scene, this.camera);
    };
}
