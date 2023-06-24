//import './style.css';
import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import {  SelectiveBloomEffect, Selection, EffectComposer, EffectPass, RenderPass } from "postprocessing";

// Setup
const canvas = document.getElementById('canvas2');

var scene2 = new THREE.Scene();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, canvas.innerWidth / canvas.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas,antialias: false,alpha: true,powerPreference: "high-performance" });

const origWidth = window.innerWidth;
const origHeight = window.innerHeight*0.8;

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, origHeight);
camera.position.set(-3, 0, 5);

const formContainer = document.getElementById('form-container');



 


// Lights

var pointLight = new THREE.PointLight(0xCCCCCC);
pointLight.position.set(0, 0, 0);

var pointLight = new THREE.PointLight(0xCCCCCC);
pointLight.position.set(0, 0, 50);

var ambientLight = new THREE.AmbientLight(0x606060);
scene.add(pointLight, ambientLight);


 //terapkan library postprocessing
 const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

//tadinya pakek bloomEffect tapi karena kita akan menambahkan lampu, avatar dan juga bintang maka memakai selective
const bloomEffect = new SelectiveBloomEffect(scene,camera,{
  luminanceThreshold: 0,
  intensity: 2, // Meningkatkan intensitas menjadi 2 (default: 1)
  height: 300 // Menyesuaikan ketinggian tampilan efek Bloom
});


composer.addPass(new EffectPass(camera, bloomEffect));


//gunakan class Selection dari postprocessing untuk memilih objek
var objekDipilih = new Selection();

bloomEffect.selection = objekDipilih;



function addStar() {
  var geometry = new THREE.SphereGeometry(0.25, 24, 24);
  var material = new THREE.MeshStandardMaterial({ emmisive: 0xffffff });
  var star = new THREE.Mesh(geometry, material);

  var [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  // Check if z value is between -50 and 50
  star.position.set(x, y, z);
  objekDipilih.add(star);
  scene.add(star);
}

Array(200).fill().forEach(addStar);



var hanTexture = new THREE.TextureLoader().load('asset/card1.png');
var han = new THREE.Mesh(new THREE.PlaneGeometry( 5, 4 ), new THREE.MeshBasicMaterial({ map: hanTexture, transparent: true }));
// han.material.opacity =-1;
// han.material.opacity =-1;
scene2.add(han);

var hanTexture2 = new THREE.TextureLoader().load('asset/card2.png');
var han2 = new THREE.Mesh(new THREE.PlaneGeometry( 5, 4 ), new THREE.MeshBasicMaterial({ map: hanTexture2, transparent: true }));
// han.material.opacity =-1;
// han.material.opacity =-1;
scene2.add(han2);

var hanTexture3 = new THREE.TextureLoader().load('asset/card3.png');
var han3 = new THREE.Mesh(new THREE.PlaneGeometry( 5, 4 ), new THREE.MeshBasicMaterial({ map: hanTexture3, transparent: true }));
// han.material.opacity =-1;
// han.material.opacity =-1;
scene2.add(han3);
//buat star


//inisialisasi secara realtime
function myFunction(x) {
  //mobile
  if (x1.matches) { // If media query matches
    const width = window.innerWidth;
    const height = window.innerHeight * 1.1;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);

    formContainer.style.width = `${width }px`;
  formContainer.style.height = `${height}px`;
  
  camera.position.set(0, -2, +5);

    han.position.z = 0;
    han.position.x = 0;
    han.position.y = 0;

    han2.position.z = 0;
    han2.position.x = 30;
    han2.position.y = 0;

    han3.position.z = 0;
    han3.position.x = 30;
    han3.position.y = 30;

    han.scale.x = 0.5; // Skala setengah pada sumbu x
    han.scale.y = 0.5; // Skala setengah pada sumbu y
    han2.scale.x = 0.5; // Skala setengah pada sumbu x
    han2.scale.y = 0.5; // Skala setengah pada sumbu y
    han3.scale.x = 0.5; // Skala setengah pada sumbu x
    han3.scale.y = 0.5; // Skala setengah pada sumbu y

        // Fungsi untuk memindahkan posisi dan rotasi kamera ke objek yang ditentukan
        function moveToTarget(targetPosition, targetRotation) {
          new TWEEN.Tween(camera.position)
            .to(targetPosition, 800) // Durasi animasi 500 ms
            .easing(TWEEN.Easing.Quadratic.Out) // Jenis animasi
            .start(); // Memulai animasi
    
          new TWEEN.Tween(camera.rotation)
            .to(targetRotation, 800) // Durasi animasi 500 ms
            .easing(TWEEN.Easing.Quadratic.Out) // Jenis animasi
            .start(); // Memulai animasi
        }
    
        // Tangani peristiwa focus pada elemen input
        const inputNama = document.getElementById('inputNama');
        inputNama.addEventListener('focus', () => {
          const targetPosition = { x: han.position.x, y: han.position.y-2, z: han.position.z+5 };
          const targetRotation = { x: han.rotation.x, y: han.rotation.y, z: han.rotation.z};
          moveToTarget(targetPosition, targetRotation);
        });
    
        const inputEmail = document.getElementById('inputEmail');
        inputEmail.addEventListener('focus', () => {
          const targetPosition = { x: han2.position.x, y: han2.position.y-2, z: han2.position.z+5 };
          const targetRotation = { x: han2.rotation.x, y: han2.rotation.y, z: han2.rotation.z };
          moveToTarget(targetPosition, targetRotation);
        });
    
        const inputPesan = document.getElementById('inputPesan');
        inputPesan.addEventListener('focus', () => {
          const targetPosition = { x:han3.position.x, y:han3.position.y-2, z: han3.position.z+5 };
          const targetRotation = { x: han3.rotation.x, y:han3.rotation.y, z: han3.rotation.z };
          moveToTarget(targetPosition, targetRotation);
        });


  } 
  //tablet
  else if(x.matches){
    const width = window.innerWidth;
    const height = window.innerHeight * 0.4;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    formContainer.style.width = `${width }px`;
    formContainer.style.height = `${height}px`;

    han.position.z = 0;
    han.position.x = 0;
    han.position.y = 0;  

    han2.position.z = 0;
    han2.position.x = 30;
    han2.position.y = 0;

    han3.position.z = 0;
    han3.position.x = 30;
    han3.position.y = 30;

    function moveToTarget(targetPosition, targetRotation) {
      new TWEEN.Tween(camera.position)
        .to(targetPosition, 800) // Durasi animasi 500 ms
        .easing(TWEEN.Easing.Quadratic.Out) // Jenis animasi
        .start(); // Memulai animasi

      new TWEEN.Tween(camera.rotation)
        .to(targetRotation, 800) // Durasi animasi 500 ms
        .easing(TWEEN.Easing.Quadratic.Out) // Jenis animasi
        .start(); // Memulai animasi
    }

        // Tangani peristiwa focus pada elemen input
        const inputNama = document.getElementById('inputNama');
        inputNama.addEventListener('focus', () => {
          const targetPosition = { x: han.position.x-3, y: han.position.y, z: han.position.z+5 };
          const targetRotation = { x: han.rotation.x, y: han.rotation.y, z: han.rotation.z};
          moveToTarget(targetPosition, targetRotation);
        });
    
        const inputEmail = document.getElementById('inputEmail');
        inputEmail.addEventListener('focus', () => {
          const targetPosition = { x: han2.position.x-3, y: han2.position.y, z: han2.position.z+5 };
          const targetRotation = { x: han2.rotation.x, y: han2.rotation.y, z: han2.rotation.z };
          moveToTarget(targetPosition, targetRotation);
        });
    
        const inputPesan = document.getElementById('inputPesan');
        inputPesan.addEventListener('focus', () => {
          const targetPosition = { x:han3.position.x-3, y:han3.position.y, z: han3.position.z+5 };
          const targetRotation = { x: han3.rotation.x, y:han3.rotation.y, z: han3.rotation.z };
          moveToTarget(targetPosition, targetRotation);
        });
    

  }
  //notebook
  else if(x2.matches){
    const width = window.innerWidth;
    const height = window.innerHeight * 0.75;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    formContainer.style.width = `${width}px`;
    formContainer.style.height = `${height}px`;
    

    han.position.z = 0;
    han.position.x = 0;
    han.position.y = 0;

    han2.position.z = 0;
    han2.position.x = 30;
    han2.position.y = 0;

    han3.position.z = 0;
    han3.position.x = 30;
    han3.position.y = 30;

    function moveToTarget(targetPosition, targetRotation) {
      new TWEEN.Tween(camera.position)
        .to(targetPosition, 800) // Durasi animasi 500 ms
        .easing(TWEEN.Easing.Quadratic.Out) // Jenis animasi
        .start(); // Memulai animasi

      new TWEEN.Tween(camera.rotation)
        .to(targetRotation, 800) // Durasi animasi 500 ms
        .easing(TWEEN.Easing.Quadratic.Out) // Jenis animasi
        .start(); // Memulai animasi
    }
    // Tangani peristiwa focus pada elemen input
    const inputNama = document.getElementById('inputNama');
    inputNama.addEventListener('focus', () => {
      const targetPosition = { x: han.position.x-3, y: han.position.y, z: han.position.z+5 };
      const targetRotation = { x: han.rotation.x, y: han.rotation.y, z: han.rotation.z};
      moveToTarget(targetPosition, targetRotation);
    });

    const inputEmail = document.getElementById('inputEmail');
    inputEmail.addEventListener('focus', () => {
      const targetPosition = { x: han2.position.x-3, y: han2.position.y, z: han2.position.z+5 };
      const targetRotation = { x: han2.rotation.x, y: han2.rotation.y, z: han2.rotation.z };
      moveToTarget(targetPosition, targetRotation);
    });

    const inputPesan = document.getElementById('inputPesan');
    inputPesan.addEventListener('focus', () => {
      const targetPosition = { x:han3.position.x-3, y:han3.position.y, z: han3.position.z+5 };
      const targetRotation = { x: han3.rotation.x, y:han3.rotation.y, z: han3.rotation.z };
      moveToTarget(targetPosition, targetRotation);
    });
    

  }
  //monitor pc
  else {
    camera.aspect = origWidth / origHeight;
    camera.updateProjectionMatrix();
    // Handle window resizing
    renderer.setSize(origWidth, origHeight);
    formContainer.style.width = `${origWidth }px`;
    formContainer.style.height = `${origHeight}px`;

    han.position.z = 0;
    han.position.x = 0;
    han.position.y = 0;

    han2.position.z = 0;
    han2.position.x = 30;
    han2.position.y = 0;

    han3.position.z = 0;
    han3.position.x = 30;
    han3.position.y = 30;

        // Fungsi untuk memindahkan posisi dan rotasi kamera ke objek yang ditentukan
    function moveToTarget(targetPosition, targetRotation) {
      new TWEEN.Tween(camera.position)
        .to(targetPosition, 800) // Durasi animasi 500 ms
        .easing(TWEEN.Easing.Quadratic.Out) // Jenis animasi
        .start(); // Memulai animasi

      new TWEEN.Tween(camera.rotation)
        .to(targetRotation, 800) // Durasi animasi 500 ms
        .easing(TWEEN.Easing.Quadratic.Out) // Jenis animasi
        .start(); // Memulai animasi
    }

    // Tangani peristiwa focus pada elemen input
    const inputNama = document.getElementById('inputNama');
    inputNama.addEventListener('focus', () => {
      const targetPosition = { x: han.position.x-3, y: han.position.y, z: han.position.z+5 };
      const targetRotation = { x: han.rotation.x, y: han.rotation.y, z: han.rotation.z};
      moveToTarget(targetPosition, targetRotation);
    });

    const inputEmail = document.getElementById('inputEmail');
    inputEmail.addEventListener('focus', () => {
      const targetPosition = { x: han2.position.x-3, y: han2.position.y, z: han2.position.z+5 };
      const targetRotation = { x: han2.rotation.x, y: han2.rotation.y, z: han2.rotation.z };
      moveToTarget(targetPosition, targetRotation);
    });

    const inputPesan = document.getElementById('inputPesan');
    inputPesan.addEventListener('focus', () => {
      const targetPosition = { x:han3.position.x-3, y:han3.position.y, z: han3.position.z+5 };
      const targetRotation = { x: han3.rotation.x, y:han3.rotation.y, z: han3.rotation.z };
      moveToTarget(targetPosition, targetRotation);
    });

  }
}
var x = window.matchMedia("(max-width: 885px)");
var x1 = window.matchMedia("(max-width: 430px)");
var x2 = window.matchMedia("(max-width: 1280px)");
myFunction(x);
x.addListener(myFunction);








// Animation Loop

function animate() {

//animasi yang dilakukan 
  requestAnimationFrame(animate);
  TWEEN.update();
  composer.render();

  //disini adalah logic untuk hover dari han
    // Update raycaster
  // controls.update();
  renderer.clear();
  composer.render();
  renderer.render( scene, camera );
  renderer.clearDepth();
  renderer.render( scene2, camera );
}

animate();

