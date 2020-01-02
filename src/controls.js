import {Vector3, Color} from "three";
import {PointerLockControls} from "three/examples/jsm/controls/PointerLockControls";
import {Clock} from "three";

let controls;
const clock = new Clock();
const moveAccel = 200.0;

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let moveUp = false;
let moveDown = false;
let canJump = false;

let velocity = new Vector3();
let direction = new Vector3();

export function initCtl(cam, domEl) {
    controls = new PointerLockControls(cam, domEl);
    let blocker = document.getElementById( 'blocker' );
    let instructions = document.getElementById( 'instructions' );
    instructions.addEventListener( 'click', function () {
        controls.lock();
    }, false );
    controls.addEventListener( 'lock', function () {
        instructions.style.display = 'none';
        blocker.style.display = 'none';
    } );
    controls.addEventListener( 'unlock', function () {
        blocker.style.display = 'block';
        instructions.style.display = '';
    } );
}

export function handleControl() {
    if ( controls.isLocked === true ) {
        // console.log(controls.GetObject().get)
        console.log("pos: " + controls.getObject().position.x + " " + controls.getObject().position.y + " " + controls.getObject().position.z );
        // console.log("Vel: " + velocity.x + " " + velocity.y + " " + velocity.z);
        let timeDelta = clock.getDelta();
        velocity.x -= velocity.x * 10.0 * timeDelta;
        velocity.y -= velocity.y * 10.0 * timeDelta;
        velocity.z -= velocity.z * 10.0 * timeDelta;
        // velocity.y -= 9.8 * 100.0 * timeDelta; // 100.0 = mass

        direction.z = Number( moveForward ) - Number( moveBackward );
        direction.x = Number( moveRight ) - Number( moveLeft );
        direction.y = Number( moveDown) - Number( moveUp);
        direction.normalize(); // this ensures consistent movements in all directions

        if ( moveForward || moveBackward ) velocity.z -= direction.z * moveAccel * timeDelta;
        if ( moveLeft || moveRight ) velocity.x -= direction.x * moveAccel * timeDelta;
        if ( moveUp || moveDown ) velocity.y -= direction.y * moveAccel * timeDelta;

        controls.moveRight( - velocity.x * timeDelta );
        controls.moveForward( - velocity.z * timeDelta);
        controls.getObject().position.y += velocity.y * timeDelta;
    }
}

var onKeyDown = function ( event ) {
    switch ( event.keyCode ) {
        case 38: // up
        case 87: // w
            moveForward = true;
            break;
        case 37: // left
        case 65: // a
            moveLeft = true;
            break;
        case 40: // down
        case 83: // s
            moveBackward = true;
            break;
        case 39: // right
        case 68: // d
            moveRight = true;
            break;
        case 32: // space
            moveUp = true;
            break;
        case 17: // ctrl
            moveDown = true;
            break;
    }
};

var onKeyUp = function ( event ) {
    switch ( event.keyCode ) {
        case 38: // up
        case 87: // w
            moveForward = false;
            break;
        case 37: // left
        case 65: // a
            moveLeft = false;
            break;
        case 40: // down
        case 83: // s
            moveBackward = false;
            break;
        case 39: // right
        case 68: // d
            moveRight = false;
            break;
        case 32: // space
            moveUp = false;
            break;
        case 17: // ctrl
            moveDown = false;
            break;
    }
};
document.addEventListener( 'keydown', onKeyDown, false );
document.addEventListener( 'keyup', onKeyUp, false );

// Stop ctrl+s from saving ctrl +d from bookmark - doesn't work for ctrl+w exit (use fullscreen for this)
document.addEventListener("keydown", function(e) {
    if ((e.keyCode === 68 || e.keyCode === 83 || e.keyCode === 65 || e.keyCode == 87)  && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
        e.preventDefault();
    }
}, false);

