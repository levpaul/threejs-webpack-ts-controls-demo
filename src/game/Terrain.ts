import * as THREE from 'three';

const groundSegmentsWidth: number = 10;
const groundSegmentsDepth: number = 10;
const hMap: number[] = new Array((groundSegmentsDepth + 1) * (groundSegmentsWidth + 1));

export function getGround() {
    for (let i = 0; i < hMap.length; i++) {
        hMap[i] = Math.random() * 6 - 3;
    }

    let groundP = new THREE.PlaneGeometry(10, 10, 10, 10);
    let groundM = new THREE.MeshLambertMaterial({color: 0x331198, wireframe: false});
    let ground = new THREE.Mesh(groundP, groundM);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;

    let vert: THREE.Geometry = ground.geometry as THREE.Geometry;
    for (let i = 0; i < vert.vertices.length; i++) {
        vert.vertices[i].z = hMap[i] * 0.25;
    }

    return ground;
}
