import * as THREE from 'three';
import * as CONTROLS from './controls.js'
import '../css/style.css';

let camera, scene, renderer;
let geometry, material, mesh, ground;

init();
animate();

function init() {
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.z = 1;
	camera.position.y = 0.1;
	// camera.rotateX(9)

	scene = new THREE.Scene();

	geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
	material = new THREE.MeshNormalMaterial({wireframe: true});
	mesh = new THREE.Mesh( geometry, material );
	mesh.translateY(0.3);

	scene.add( mesh );


	let groundP = new THREE.PlaneGeometry(20,20,32);
	ground = new THREE.Mesh(groundP, material);
	scene.add(ground);
	ground.rotateX(1);


	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	CONTROLS.initCtl(camera, renderer.domElement);

	window.addEventListener( 'resize', onWindowResize, false );
}

let animationId;
function animate() {
	animationId = requestAnimationFrame( animate );

	// ground.rotation.x += 0.01
	mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.01;
	// controls.update(clock.getDelta());

	CONTROLS.handleControl();
	renderer.render( scene, camera );
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

// let loader = new GLTFLoader();
// loader.load('../models/room.glb', function (gltf) {
// 	scene.add(gltf.scene);
// }, undefined, function (error) {
// 	console.error(error);
// });

