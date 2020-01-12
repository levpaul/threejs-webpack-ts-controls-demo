import * as THREE from 'three';
import {getGround} from './Terrain';
import {GetAnimationHandlers} from "../utils/Store";

export interface AnimationHandler {
    name: string

    handler(): void
}

const gameSettings = {
    cameraFOV: 45,
    cameraNear: 0.1,
    cameraFar: 1000,
    fogNear: 49,
    fogFar: 99,
};

export default class GameApp {
    camera: THREE.PerspectiveCamera;
    scene: THREE.Scene;
    cube: THREE.Mesh;
    renderer: THREE.WebGLRenderer;

    constructor() {
        // this.scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xa0a0a0);
        this.scene.fog = new THREE.Fog(0xa0a0a0, gameSettings.fogNear, gameSettings.fogFar);

        // Camera
        this.camera = new THREE.PerspectiveCamera(gameSettings.cameraFOV, window.innerWidth / window.innerHeight, gameSettings.cameraNear, gameSettings.cameraFar);

        // Cube
        const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        const material = new THREE.MeshNormalMaterial({wireframe: false});
        this.cube = new THREE.Mesh(geometry, material);
        this.cube.translateY(1);
        this.scene.add(this.cube);

        // Terrain
        this.scene.add(getGround());

        // Renderer
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        // Light
        const lights: Array<THREE.Light> = new Array<THREE.Light>();
        lights.push(new THREE.AmbientLight(0x333333));
        lights.push(new THREE.PointLight(0xffffff, 1, 0));
        lights.push(new THREE.PointLight(0xffffff, 1, 0));
        lights.push(new THREE.PointLight(0xffffff, 1, 0));
        lights[2].position.set(10, 0, 0);
        lights[3].position.set(0, 0, 7);
        for (let l of lights) {
            this.scene.add(l);
        }

        // Final Camera
        this.camera.position.set(3, 3.5, -4);
        this.camera.lookAt(this.cube.position);

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

        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;


        for (let h of GetAnimationHandlers()) {
            h.handle();
        }

        this.renderer.render(this.scene, this.camera);
    };
}
