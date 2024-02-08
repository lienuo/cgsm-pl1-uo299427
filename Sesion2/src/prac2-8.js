import * as THREE from 'three';
import WEBGL from 'three/examples/jsm/capabilities/WebGL.js';

if ( WEBGL.isWebGLAvailable() ) {
    // WebGL is available
    console.log('Soporta WebGL');
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer( {antialias: true} );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    const camera = new THREE.PerspectiveCamera ( 45, window.innerWidth / window.innerHeight, 1, 4000 );
    camera.position.set( 0, 0, 500 );
   
// luz
const light=  new THREE.PointLight( 0xffffff, 1,1000,0 );
light.position.set( 0, 0, 400 );
scene.add( light );
//Tierra
const mapUrl = "../textures/tierra.gif";   // The file used as texture
const textureLoader = new THREE.TextureLoader( );  // The object used to load textures
const map = textureLoader.load( mapUrl, ( loaded ) => { renderer.render( scene, camera ); } );
const material1 = new THREE.MeshPhongMaterial( { map: map } );
const geometryesfera = new THREE.SphereGeometry( 30, 30, 30 ); 
const sphere = new THREE.Mesh( geometryesfera, material1 ); 


//Atmósfera
const Nube = "../textures/Nube.png";   
const textureLoader1 = new THREE.TextureLoader( );  
const mapNube = textureLoader.load( Nube, ( loaded ) => { renderer.render( scene, camera ); } );
var atmosphereMaterial = new THREE.MeshLambertMaterial( { color: 0xFFFFFF, map: mapNube, transparent: true } );
const geometrynube = new THREE.SphereGeometry( 30, 31, 31 ); 
const sphere1 = new THREE.Mesh( geometrynube, atmosphereMaterial ); 

//  Creando el Objeto.Tierra
const object = new THREE.Object3D();
object.add( sphere );
object.add( sphere1 );
object.rotation.z=0.36; //Rotoacion de Objeto.
scene.add( object );

//Sol
const NOISEMAP = '../textures/cloud.png';
const SUNMAP = '../textures/lavatile.jpg';
const textureLoaderSol = new THREE.TextureLoader( );
const uniforms = {
    "fogDensity": { value: 0 },
    "fogColor": { value: new THREE.Vector3( 0, 0, 0 ) },
    "time": { value: 1.0 },
    "uvScale": { value: new THREE.Vector2( 3.0, 1.0 ) },
    "texture1": { value: textureLoaderSol.load( NOISEMAP ) },
    "texture2": { value: textureLoaderSol.load( SUNMAP ) }
};

uniforms[ "texture1" ].value.wrapS = uniforms[ "texture1" ].value.wrapT = THREE.RepeatWrapping;
uniforms[ "texture2" ].value.wrapS = uniforms[ "texture2" ].value.wrapT = THREE.RepeatWrapping;

const vertexShader = require( '../shaders/vertex.glsl' );
const fragmentShader = require( '../shaders/fragment.glsl' );

const material = new THREE.ShaderMaterial( {
    uniforms,
     vertexShader,
    fragmentShader
} );

const Sol = new THREE.SphereGeometry( 120, 120, 120 ); 
const MostrarSol = new THREE.Mesh( Sol, material ); 
MostrarSol.position.set( -230, 0, 0 );
scene.add( MostrarSol );


//Luna
const mapluna = "../textures/moon_1024.jpg";   // The file used as texture
const textureLuna = new THREE.TextureLoader( );  // The object used to load textures
const maplu = textureLoader.load( mapluna, ( loaded ) => { renderer.render( scene, camera ); } );
const materialLuna = new THREE.MeshLambertMaterial( { map: maplu } );
const geometryLuna = new THREE.SphereGeometry( 13.5, 13.5, 13.5 ); 
const Luna = new THREE.Mesh( geometryLuna, materialLuna ); 
Luna.position.set(-100,0,0);
Luna.rotation.y=Math.PI;
const moonGroup = new THREE.Object3D( );
moonGroup.add( Luna );
moonGroup.rotation.x = 0.089;
scene.add( moonGroup );

const clock = new THREE.Clock();
// Velocidad angular en radianes por segundo
//var orbitalPeriodSeconds = 2419200;
var angularSpeed = (2 * Math.PI) / 2419200;

animate();

function animate( ) {

    const delta = clock.getDelta( ); //  Calcular el tiempo transcurrido

    const rotation = ( delta * Math.PI * 2 ) / 24;
    sphere.rotation.y += rotation;
    sphere1.rotation.y += rotation * 0.95;
    uniforms[ "time" ].value += 0.2 * delta;

  // Rotar la Luna alrededor del eje Y (vertical) con la velocidad angular calculada
 
    moonGroup.rotateOnAxis(new THREE.Vector3(0, 1, 0),0.01 );

    // Render the scene
    renderer.render( scene, camera );

    // Request the browser to execute the animation-rendering loop
    requestAnimationFrame( animate );
};



// 


renderer.render( scene, camera );
    window.addEventListener( 'resize', ( ) => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix( );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.render( scene, camera );
    }, false );
}
