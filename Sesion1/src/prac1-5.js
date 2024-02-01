import * as THREE from 'three';
import WEBGL from 'three/examples/jsm/capabilities/WebGL.js';
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer( {antialias: true} );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const camera = new THREE.PerspectiveCamera ( 45, window.innerWidth / window.innerHeight, 1, 4000 );
camera.position.set( 0, 0, 300 );


const geometry = new THREE.BufferGeometry( );

const inner = 10.0;
const outer = 40.0;
const techo = 60.0;
const puerta=10.0;

const vertices = new Float32Array( [
    // Internal vertices
    -inner, inner, 0,   //0
    inner, inner, 0,    //1
    inner, -inner, 0,   //2
    -inner, -inner, 0,  //3

    // External vertices
    -outer, outer, 0,   //4
    outer, outer, 0,    //5
    outer, -outer, 0,   //6
    -outer, -outer, 0,   //7

    //Techo
    0, techo, 0 ,  //8
    

] );

// Faces (indices of vertices)
const indices = [
    5, 4, 0,
    0, 1, 5,
    6, 5, 1,
    1, 2, 6,
    7, 6, 2,
    2, 3, 7,
    4, 7, 3,
    3, 0, 4,
    6, 5, 8,
    8, 4, 5
];

geometry.setIndex( indices );
geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );

const material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
const square = new THREE.Mesh( geometry, material );
scene.add( square );
renderer.render( scene, camera );