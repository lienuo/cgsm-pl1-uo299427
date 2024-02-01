import * as THREE from 'three';
import WEBGL from 'three/examples/jsm/capabilities/WebGL.js';

if ( WEBGL.isWebGLAvailable() ) {
    // WebGL is available
    //console.log('Soporta WebGL');
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer( {antialias: true} );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    const camera = new THREE.PerspectiveCamera ( 45, window.innerWidth / window.innerHeight, 1, 4000 );
    camera.position.set( 0, 0, 300 );
    //Bok
    const geometry = new THREE.BoxGeometry( 40, 40, 40 );
    const material = new THREE.MeshBasicMaterial({color: 0xffff0000} );
    const box = new THREE.Mesh( geometry, material );
    box.position.set(-100,0,0)
    
    //Cilindro.
    const geometrycilindro = new THREE.CylinderGeometry( 10, 10, 40, 32 ); 
    const material1 = new THREE.MeshBasicMaterial( {color: 0x0000ff} ); 
    const cylinder = new THREE.Mesh( geometrycilindro, material1 ); scene.add( cylinder )
    cylinder.rotation.set( Math.PI / 5, Math.PI / 5, 0 )
    //Esfera
    const geometryesfera = new THREE.SphereGeometry( 15, 40, 40 ); 
    const material2 = new THREE.MeshBasicMaterial( { color: 0xffff25 } ); 
    const sphere = new THREE.Mesh( geometryesfera, material2 ); scene.add( sphere );
    sphere.position.set(100,0,0)
    sphere.rotation.set( Math.PI / 5, Math.PI / 5, 0 )

    scene.add( box );
    renderer.render( scene, camera );}
