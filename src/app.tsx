import './css/style.css';
import * as THREE from 'three';
import {InputController, Controls, controller} from './controls';
import {getGround} from './terrain';
import * as React from 'react'
import ReactDOM from "react-dom";
import {useEffect} from "react";

let camera: THREE.PerspectiveCamera;
let scene: THREE.Scene;
let renderer: THREE.Renderer;
let geometry: THREE.Geometry;
let material: THREE.Material;
let cube: THREE.Mesh;

const lights: Array<THREE.Light> = new Array<THREE.Light>();

const isMobile: boolean = testMobile();

const App = () => {
    return (
        <ThreeCanvas/>
    )
};

const ThreeCanvas = () => {
    // Setup
    window.addEventListener('resize', onWindowResize, false);

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
    scene.add(getGround());

    // Renderer
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);

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

    // Begin animation loop
    const animate = () => {
        requestAnimationFrame(animate);

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        if (controller != null)
            controller.handleControl();

        renderer.render(scene, camera);
    };
    animate();

    // Get the actual THREE.js Canvas
    let ref = React.useRef<HTMLCanvasElement>();
    useEffect(() => {
        ref.current.replaceWith(renderer.domElement);
    }, []);

    return (<>
        <Controls camera={camera} renderDom={renderer.domElement} isMobile={isMobile}/>
        <canvas ref={ref as React.MutableRefObject<HTMLCanvasElement>}/>
    </>);
};

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function testMobile(): boolean {
    return /mobile/i.test(window.navigator.userAgent);
}

const root = document.getElementById('root');
ReactDOM.render(<App/>, root);
