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
  mipmapBlur:true,
  radius:0.6,
  intensity:3.4,
  luminanceSmoothing:0,
  luminanceThreshold:0.3
});


composer.addPass(new EffectPass(camera, bloomEffect));


//gunakan class Selection dari postprocessing untuk memilih objek
var objekDipilih = new Selection();

bloomEffect.selection = objekDipilih;



// Inisialisasi bintang-bintang
const stars = []; // Array untuk menyimpan bintang-bintang
const numStars = 250;

// Fungsi untuk membuat bintang
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ emissive: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const x = Math.max(Math.min(THREE.MathUtils.randFloatSpread(150), 60), -60); // Koordinat x antara -20 dan 100
  const y =  Math.max(Math.min(THREE.MathUtils.randFloatSpread(150), 60), -60); // Koordinat y antara -5 dan 100
  const z = Math.max(Math.min(THREE.MathUtils.randFloatSpread(100), -3), -100); // Koordinat z antara -100 dan 0
  
  star.position.set(x,  y, z);

  const speed = THREE.MathUtils.randFloat(0.1, 0.5); // Kecepatan perubahan posisi

  stars.push({ mesh: star, initialPosition: star.position.clone(), speed });
  objekDipilih.add(star);
  scene.add(star);
}

// Tambahkan bintang-bintang ke dalam adegan
Array(numStars).fill().forEach(addStar);





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
    han.position.y = 0.3;

    han2.position.z = 0;
    han2.position.x = 30;
    han2.position.y = 0.3;

    han3.position.z = 0;
    han3.position.x = 30;
    han3.position.y = 30.3;

    han.scale.x = 0.5; // Skala setengah pada sumbu x
    han.scale.y = 0.5; // Skala setengah pada sumbu y
    han2.scale.x = 0.5; // Skala setengah pada sumbu x
    han2.scale.y = 0.5; // Skala setengah pada sumbu y
    han3.scale.x = 0.5; // Skala setengah pada sumbu x
    han3.scale.y = 0.5; // Skala setengah pada sumbu y

    //Animasi besar kecil
    // Definisikan tween animasi resize kecil
function createAnimationTween(mesh) {
  const smallScale = 0.4; // Ukuran kecil
  const smallTween = new TWEEN.Tween(mesh.scale)
      .to({ x: smallScale, y: smallScale, z: smallScale }, 1000) // Durasi 1 detik
      .easing(TWEEN.Easing.Quadratic.Out);

  const originalScale = 0.5; // Ukuran semula
  const originalTween = new TWEEN.Tween(mesh.scale)
      .to({ x: originalScale, y: originalScale, z: originalScale }, 1000) // Durasi 1 detik
      .easing(TWEEN.Easing.Quadratic.In);

  // Gabungkan tween-tween dalam satu urutan loop
  smallTween.chain(originalTween);
  originalTween.chain(smallTween);

  return smallTween; // Kembalikan tween yang telah dibuat
}

// Buat tween animasi untuk setiap objek
const hanTween = createAnimationTween(han);
const han1Tween = createAnimationTween(han2);
const han3Tween = createAnimationTween(han3);

// Mulai animasi dengan memanggil .start() pada setiap tween
hanTween.start();
han1Tween.start();
han3Tween.start();





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
          const targetPosition = { x: han.position.x, y: han.position.y-2.3, z: han.position.z+5 };
          const targetRotation = { x: han.rotation.x, y: han.rotation.y, z: han.rotation.z};
          moveToTarget(targetPosition, targetRotation);
        });
    
        const inputEmail = document.getElementById('inputEmail');
        inputEmail.addEventListener('focus', () => {
          const targetPosition = { x: han2.position.x, y: han2.position.y-2.3, z: han2.position.z+5 };
          const targetRotation = { x: han2.rotation.x, y: han2.rotation.y, z: han2.rotation.z };
          moveToTarget(targetPosition, targetRotation);
        });
    
        const inputPesan = document.getElementById('inputPesan');
        inputPesan.addEventListener('focus', () => {
          const targetPosition = { x:han3.position.x, y:han3.position.y-2.3, z: han3.position.z+5 };
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


    //animasi jedah jedug
    // Definisikan tween animasi resize kecil
function createAnimationTween(mesh) {
  const smallScale = 0.8; // Ukuran kecil
  const smallTween = new TWEEN.Tween(mesh.scale)
      .to({ x: smallScale, y: smallScale, z: smallScale }, 1000) // Durasi 1 detik
      .easing(TWEEN.Easing.Quadratic.Out);

  const originalScale = 1; // Ukuran semula
  const originalTween = new TWEEN.Tween(mesh.scale)
      .to({ x: originalScale, y: originalScale, z: originalScale }, 1000) // Durasi 1 detik
      .easing(TWEEN.Easing.Quadratic.In);

  // Gabungkan tween-tween dalam satu urutan loop
  smallTween.chain(originalTween);
  originalTween.chain(smallTween);

  return smallTween; // Kembalikan tween yang telah dibuat
}

// Buat tween animasi untuk setiap objek
const hanTween = createAnimationTween(han);
const han1Tween = createAnimationTween(han2);
const han3Tween = createAnimationTween(han3);

// Mulai animasi dengan memanggil .start() pada setiap tween
hanTween.start();
han1Tween.start();
han3Tween.start();

    //animasi focus
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

    //animasi jedag jedug
    // Definisikan tween animasi resize kecil
function createAnimationTween(mesh) {
  const smallScale = 0.8; // Ukuran kecil
  const smallTween = new TWEEN.Tween(mesh.scale)
      .to({ x: smallScale, y: smallScale, z: smallScale }, 1000) // Durasi 1 detik
      .easing(TWEEN.Easing.Quadratic.Out);

  const originalScale = 1; // Ukuran semula
  const originalTween = new TWEEN.Tween(mesh.scale)
      .to({ x: originalScale, y: originalScale, z: originalScale }, 1000) // Durasi 1 detik
      .easing(TWEEN.Easing.Quadratic.In);

  // Gabungkan tween-tween dalam satu urutan loop
  smallTween.chain(originalTween);
  originalTween.chain(smallTween);

  return smallTween; // Kembalikan tween yang telah dibuat
}

// Buat tween animasi untuk setiap objek
const hanTween = createAnimationTween(han);
const han1Tween = createAnimationTween(han2);
const han3Tween = createAnimationTween(han3);

// Mulai animasi dengan memanggil .start() pada setiap tween
hanTween.start();
han1Tween.start();
han3Tween.start();


    //animasi fokus
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


//animasi jedag jedug
    // Definisikan tween animasi resize kecil
function createAnimationTween(mesh) {
  const smallScale = 0.8; // Ukuran kecil
  const smallTween = new TWEEN.Tween(mesh.scale)
      .to({ x: smallScale, y: smallScale, z: smallScale }, 1000) // Durasi 1 detik
      .easing(TWEEN.Easing.Quadratic.Out);

  const originalScale = 1; // Ukuran semula
  const originalTween = new TWEEN.Tween(mesh.scale)
      .to({ x: originalScale, y: originalScale, z: originalScale }, 1000) // Durasi 1 detik
      .easing(TWEEN.Easing.Quadratic.In);

  // Gabungkan tween-tween dalam satu urutan loop
  smallTween.chain(originalTween);
  originalTween.chain(smallTween);

  return smallTween; // Kembalikan tween yang telah dibuat
}

// Buat tween animasi untuk setiap objek
const hanTween = createAnimationTween(han);
const han1Tween = createAnimationTween(han2);
const han3Tween = createAnimationTween(han3);

// Mulai animasi dengan memanggil .start() pada setiap tween
hanTween.start();
han1Tween.start();
han3Tween.start();

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



//kondisi menghentikan animasi ketika scroll
let isSceneVisible = false; // Set awalnya ke false karena canvas terlihat

function handleScroll() {
  const canvasElement = document.getElementById('canvas2');
  const rect = canvasElement.getBoundingClientRect();

  // Menentukan apakah elemen canvas ada di luar viewport
  if (
    rect.bottom <= 0 ||
    rect.top >= window.innerHeight ||
    rect.right <= 0 ||
    rect.left >= window.innerWidth
  ) {
    isSceneVisible = true;
  } else {
    isSceneVisible = false;
  }
}

window.addEventListener('scroll', handleScroll);



let clock = new THREE.Clock();
let delta = 0;
// 70 fps
let interval = 1 / 60;



// Animation Loop

function animate() {

//animasi yang dilakukan 
  requestAnimationFrame(animate);

  if (!isSceneVisible) {

    TWEEN.update();

      //disini animasi untuk bintang (random)
      const time = Date.now() * 0.001; // Waktu dalam detik

      stars.forEach(starData => {
        const { mesh, initialPosition, speed } = starData;
    
        // Hitung perpindahan berdasarkan waktu dan kecepatan
        const displacement = Math.sin(time * speed) * 5; // Perubahan dalam jarak dari posisi awal
        const newPosition = initialPosition.clone().add(new THREE.Vector3(displacement, displacement, displacement));
    
        mesh.position.copy(newPosition);
      });
     //disini akhir animasi untuk bintang (random)


        // controls.update();
    delta += clock.getDelta();

    if (delta  > interval) {
      //disini adalah logic untuk hover dari han
        // Update raycaster
      // controls.update();

      renderer.clear();
      composer.render();

      renderer.clearDepth();
      renderer.render( scene2, camera );
    }
    
  }
}

animate();

