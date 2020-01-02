import * as THREE from 'three';
import '../css/style.css';
import {InputController} from "./controls";
import {Geometry, Material, Mesh, PerspectiveCamera, Renderer, Scene} from "three";

let camera: PerspectiveCamera;
let scene: Scene;
let renderer: Renderer;
let gameContainer: HTMLElement;
let geometry: Geometry;
let material: Material;
let mesh: Mesh;
let ground: Mesh;

let inputController: InputController;

init();
animate();

function init() {
    scene = new THREE.Scene();
    gameContainer = document.createElement('div');
    document.body.append(gameContainer);

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000);
    camera.position.z = 1;
    camera.position.y = 0.1;

    // Cube
    geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    material = new THREE.MeshNormalMaterial({wireframe: true});
    mesh = new THREE.Mesh(geometry, material);
    mesh.translateY(0.3);
    scene.add(mesh);

    // Ground
    let groundP = new THREE.PlaneGeometry(21, 20, 32);
    ground = new THREE.Mesh(groundP, material);
    scene.add(ground);
    ground.rotateX(Math.PI / 2);

    // Renderer
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    gameContainer.appendChild(renderer.domElement);


    inputController = new InputController({
        "camera": camera,
        renderDom: renderer.domElement,
        gameContainer: gameContainer
    });

    // Stats
    window.addEventListener('resize', onWindowResize, false);
}

let animationId;

function animate() {
    animationId = requestAnimationFrame(animate);

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;

    inputController.handleControl();
    inputController.handleStats();
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// let loader = new GLTFLoader();
// loader.load('../models/room.glb', function (gltf) {
// 	scene.add(gltf.scene);
// }, undefined, function (error) {
// 	console.error(error);
// });

