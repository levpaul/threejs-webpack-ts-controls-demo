import './css/style.css';
import * as THREE from 'three';
import * as CONTROLS from './controls';
import * as TERRAIN from './terrain';

let camera: THREE.PerspectiveCamera;
let scene: THREE.Scene;
let renderer: THREE.Renderer;
let gameContainer: HTMLElement;
let geometry: THREE.Geometry;
let material: THREE.Material;
let cube: THREE.Mesh;

let inputController: CONTROLS.InputController;
let lights: Array<THREE.Light> = new Array<THREE.Light>();

let isMobile: boolean = false;

init();
animate();

function init() {
    // Setup
    gameContainer = document.createElement('div');
    document.body.append(gameContainer);
    window.addEventListener('resize', onWindowResize, false);
    handleMobile();

    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xa0a0a0);
    scene.fog = new THREE.Fog(0xa0a0a0, 5, 15);

    // Camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    // Cube
    geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    material = new THREE.MeshNormalMaterial({wireframe: false});
    cube = new THREE.Mesh(geometry, material);
    cube.translateY(0.3);
    scene.add(cube);

    // Terrain
    scene.add(TERRAIN.getGround());

    // Renderer
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    gameContainer.appendChild(renderer.domElement);

    // Controls
    inputController = CONTROLS.getController({
        "camera": camera,
        renderDom: renderer.domElement,
        gameContainer: gameContainer,
        isMobile: isMobile
    });

    // Light
    lights.push(new THREE.AmbientLight(0x333333));
    lights.push(new THREE.PointLight(0xffffff, 1, 0));
    lights.push(new THREE.PointLight(0xffffff, 1, 0));
    lights.push(new THREE.PointLight(0xffffff, 1, 0));
    lights[2].position.set(10, 0, 0);
    lights[3].position.set(0, 0, 7);
    for (let l of lights) {
        scene.add(l);
    }

    // Final Camera
    camera.position.set(3, 3.5, -4);
    camera.lookAt(cube.position);
}

function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    inputController.handleControl();

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function handleMobile() {
    // TODO: Remove this as it's a terrible idea
    if (/mobile/i.test(window.navigator.userAgent)){
        isMobile = true;
        // TODO: Remove this as it is a smell - maybe react can help here?
        let blocker = document.getElementById('blocker') as HTMLElement;
        let instructions = document.getElementById('instructions') as HTMLElement;
        blocker.style.display = 'none';
        instructions.style.display = 'none';
    }
}
