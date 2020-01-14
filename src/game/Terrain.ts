import * as THREE from 'three';
import {BufferAttribute} from "three";

const groundSegmentsWidth: number = 50;
const groundSegmentsDepth: number = 50;
const groundSegmentsWidthCount: number = 100;
const groundSegmentsDepthCount: number = 100;
const maxHeight: number = 1;
const hMap: number[] = new Array((groundSegmentsDepthCount + 1) * (groundSegmentsWidthCount + 1));

export function getGround() {
    for (let i = 0; i < hMap.length; i++) {
        hMap[i] = Math.random() * maxHeight - (maxHeight / 2);
    }

    let groundP = new THREE.PlaneGeometry(groundSegmentsWidth, groundSegmentsDepth, groundSegmentsWidthCount, groundSegmentsDepthCount);
    let groundM = new THREE.MeshPhongMaterial({color: 0x331198, wireframe: false, vertexColors: THREE.FaceColors});
    let ground = new THREE.Mesh(groundP, groundM);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;

    let vert: THREE.Geometry = ground.geometry as THREE.Geometry;
    for (let i in hMap)
        vert.vertices[i].z = hMap[i];


    return ground;
}
