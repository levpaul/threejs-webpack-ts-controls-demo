import * as THREE from 'three';
import '../css/style.css';
import {InputController} from './controls';
import {Geometry, Material, Mesh, PerspectiveCamera, Renderer, Scene, Vector3} from 'three';

let camera: PerspectiveCamera;
let scene: Scene;
let renderer: Renderer;
let gameContainer: HTMLElement;
let geometry: Geometry;
let material: Material;
let cube: Mesh;
let ground: Mesh;

let inputController: InputController;
let terrain: Mesh;

init();
animate();

function init() {
    gameContainer = document.createElement('div');
    document.body.append(gameContainer);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xa0a0a0);
    scene.fog = new THREE.Fog(0xa0a0a0, 10, 50);

    // Camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    let hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    // Cube
    geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    material = new THREE.MeshNormalMaterial({wireframe: false});
    cube = new THREE.Mesh(geometry, material);
    cube .translateY(0.3);
    scene.add(cube);

    // Ground Terrain
    let groundP = new THREE.PlaneBufferGeometry(100, 100);
    let groundM = new THREE.MeshPhongMaterial({color: 0x999999, depthWrite: false});
    ground = new THREE.Mesh(groundP, groundM);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Renderer
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    gameContainer.appendChild(renderer.domElement);

    inputController = new InputController({
        "camera": camera,
        renderDom: renderer.domElement,
        gameContainer: gameContainer
    });

    window.addEventListener('resize', onWindowResize, false);

    var light = new THREE.AmbientLight(0xFFFFFF);

    scene.add(light);

    camera.position.set(1, 2, -7);
    camera.lookAt(cube.position);
}

function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    inputController.handleControl();
    inputController.handleStats();

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

