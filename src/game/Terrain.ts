import * as THREE from 'three';

const groundSegmentsWidth: number = 10;
const groundSegmentsDepth: number = 10;
const groundSegmentsWidthCount: number = 4;
const groundSegmentsDepthCount: number = 4;
const maxHeight: number = 0;
const hMap: number[] = new Array((groundSegmentsDepth + 1) * (groundSegmentsWidth + 1));

export function getGround() {
    for (let i = 0; i < hMap.length; i++) {
        hMap[i] = Math.random() * maxHeight - (maxHeight / 2);
    }

    let groundP = new THREE.PlaneGeometry(groundSegmentsWidth, groundSegmentsDepth, groundSegmentsWidthCount, groundSegmentsDepthCount);
    let groundM = new THREE.MeshLambertMaterial({color: 0x331198, wireframe: false, vertexColors: THREE.FaceColors});
    let ground = new THREE.Mesh(groundP, groundM);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;

    let vert: THREE.Geometry = ground.geometry as THREE.Geometry;
    for (let i = 0; i < vert.vertices.length; i++) {
        vert.vertices[i].z = hMap[i];
    }

    return ground;
}
