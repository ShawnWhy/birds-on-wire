import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import GUI from "lil-gui";
const sound1 = new Audio("/sounds/1.mp3");
const sound2 = new Audio("/sounds/2.mp3");
const sound3 = new Audio("/sounds/3.mp3");
const sound4 = new Audio("/sounds/4.mp3");
const sound5 = new Audio("/sounds/5.mp3");
const sound6 = new Audio("/sounds/6.mp3");
const sound7 = new Audio("/sounds/7.mp3");
const sound8 = new Audio("/sounds/8.mp3");
const sing = new Audio("/sounds/sing.mp3");
// create a full cover div with a image background
let coverpage = document.createElement("div");
coverpage.style.width = "100%";
coverpage.style.height = "100%";
coverpage.style.position = "fixed";
coverpage.style.top = "0";
coverpage.style.left = "0";
coverpage.style.zIndex = "100";
coverpage.style.backgroundImage = "url('/images/star2.gif')";
coverpage.style.backgroundSize = "cover";
coverpage.style.backgroundPosition = "center";
coverpage.style.backgroundRepeat = "no-repeat";
//have "Click to start h1 text in the center of the page"
let h1 = document.createElement("h1");
h1.style.position = "absolute";
h1.style.top = "50%";
h1.style.left = "50%";
h1.style.transform = "translate(-50%, -50%)";
h1.style.color = "white";
h1.style.fontSize = "2rem";
h1.style.fontFamily = "Arial";
h1.style.textAlign = "center";
h1.innerHTML = "Click to start";
coverpage.appendChild(h1);
//append the coverpage to the body
document.body.appendChild(coverpage);

//add an event listener to the coverpage
coverpage.addEventListener("click", () => {
  //remove the coverpage from the body
  document.body.removeChild(coverpage);
  //play the sound
  sing.play();
});


// Scene
const scene = new THREE.Scene();

//animation triggers
let trigger = "on";
let trigger1 = "on";

let trigger2 = "on";
let trigger3 = "on";
let trigger4 = "on";
let trigger5 = "on";
let trigger6 = "on";
let trigger7 = "on";

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

let background1;
let background2;
let background3;
let background4;

const loader = new THREE.TextureLoader();
 loader.load("/images/star1.gif", function (texture) {
background1 = texture;
scene.background = background1;

});
 loader.load("/images/star2.gif", function (texture) {
   background2 = texture;
 });

  loader.load("/images/sky-3.gif", function (texture) {
   background3 = texture;
 });

   loader.load("/images/sky-4.gif", function (texture) {
     background4 = texture;
   });

/**
 * Camera
 */
// Base camera
// const camera = new THREE.OrthographicCamera(-sizes.width / 2, sizes.width / 2, sizes.height / 2, -sizes.height / 2, -100, 1000)
// camera.position.set(10, 7, 0);

const camera = new THREE.PerspectiveCamera(
  100,
  sizes.width / sizes.height,
  0.1,
  1000
);

function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}
camera.position.set(
  438.73744774106035,

  430.330159021041,

  -31.63689310054366
);

camera.rotation.set(
  -1.5549827383113777,

  1.103589552481979,

  1.5530849414008676
);

scene.add(camera);

//raycaster
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
mouse.x = null;
mouse.y = null;

window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / sizes.width) * 2 - 1;
  mouse.y = -(event.clientY / sizes.height) * 2 + 1;
});

let birdIntersect;
let bird1Intersect;
let bird2Intersect;
let bird3Intersect;
let bird4Intersect;
let bird5Intersect;
let bird6Intersect;
let bird7Intersect;
/**
 * Base
 */
// Debug
//ANIMATIONS
let mixer;
let mixer1;
let mixer2;
let mixer3;
let mixer4;
let mixer5;
let mixer6;
let mixer7;

let jumpanimation;
let jumpanimation1;
let jumpanimation2;
let jumpanimation3;
let jumpanimation4;
let jumpanimation5;
let jumpanimation6;
let jumpanimation7;

let pole;
let bird;
let bird1;
let bird2;
let bird3;
let bird4;
let bird5;
let bird6;
let bird7;

let birdPositions = [];
let birdColors = [];

//add 7 colors that are tints to birdColors
//   birdColors.push({r: Math.random(), g: Math.random(), b: Math.random(), isColor: true});

for (let i = 0; i < 7; i++) {
  //   birdColors.push(new THREE.Color(0xffffff).offsetHSL(0, 0, 0.1*i));
  birdColors.push({
    r: Math.random(),
    g: Math.random(),
    b: Math.random(),
    isColor: true,
  });
}
// Canvas
const canvas = document.querySelector("canvas.webgl");

/**
 * Models
 */
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/");

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

//set background color to white
scene.background = new THREE.Color(0xffffff);

gltfLoader.load("/models/telephonepole.glb", (gltf) => {
  gltf.scene.scale.set(50, 50, 50);
  pole = gltf.scene;
  scene.add(pole);
  // console.log(gltf.scene);
  let birdstand = gltf.scene.children[2];
  let birdstand1 = gltf.scene.children[3];
  let birdstand2 = gltf.scene.children[4];
  let birdstand3 = gltf.scene.children[5];
  let birdstand4 = gltf.scene.children[6];
  let birdstand5 = gltf.scene.children[7];
  let birdstand6 = gltf.scene.children[8];
  let birdstand7 = gltf.scene.children[9];


  birdPositions.push(birdstand.position);
  birdPositions.push(birdstand1.position);
  birdPositions.push(birdstand2.position);
  birdPositions.push(birdstand3.position);
  birdPositions.push(birdstand4.position);
  birdPositions.push(birdstand5.position);
  birdPositions.push(birdstand6.position);
  birdPositions.push(birdstand7.position);


  gltfLoader.load("/models/birdjump.glb", (gltf) => {
    gltf.scene.scale.set(0.005, 0.005, 0.005);
    gltf.scene.rotation.y = Math.PI * 0.5;

    mixer = new THREE.AnimationMixer(gltf.scene);
    // console.log(gltf.scene);
    // console.log(gltf.animations);
    jumpanimation = mixer.clipAction(gltf.animations[0]);
    jumpanimation.timeScale = 2;

    jumpanimation.time = 0;
    jumpanimation.loop = THREE.LoopOnce;
    jumpanimation.play();
    jumpanimation.paused = true;
    // console.log(jumpanimation);
    bird = gltf.scene;
    //go through the children of bird1 and find a child named body
    bird.children[0].children.forEach((child) => {
      if (child.name === "body") {
        let body = child;
        body.children.forEach((child) => {
          if (child.name === "Plane003") {
            let body2 = child;
            // console.log(body2.material.color);
            //give a random number from 0 to number of colors in birdColors
            let randomColor = Math.floor(Math.random() * birdColors.length);
            body2.material.color = birdColors[randomColor];
            // console.log(body2.material.color);
          }
        });
      }

      pole.add(bird);
      bird.position.set(
        birdstand.position.x,
        birdstand.position.y + 1.1,
        birdstand.position.z
      );
    });

    // loadBirds("/models/birdjump.glb", mixer6, jumpanimation6, bird7, birdstand6);
  });
  loadBirds("/models/birdjump.glb", "mixer1", birdstand1);
  loadBirds("/models/birdjump.glb", "mixer2", birdstand2);
  loadBirds("/models/birdjump.glb", "mixer3", birdstand3);
  loadBirds("/models/birdjump.glb", "mixer4", birdstand4);
  loadBirds("/models/birdjump.glb", "mixer5", birdstand5);
  loadBirds("/models/birdjump.glb", "mixer6", birdstand6);
  loadBirds("/models/birdjump.glb", "mixer7", birdstand7);
});

/**
 * Floor
 */
// create a function to load in the birds
// create a function to load in the birds
function loadBirds(modelpath, birdMixer, stand) {
  gltfLoader.load(modelpath, (gltf) => {
    gltf.scene.scale.set(0.005, 0.005, 0.005);
    gltf.scene.rotation.y = Math.PI * 0.5;

    switch (birdMixer) {
      case "mixer1":
        mixer1 = new THREE.AnimationMixer(gltf.scene);
        jumpanimation1 = mixer1.clipAction(gltf.animations[0]);
        jumpanimation1.timeScale = 2;

        jumpanimation1.time = 0;
        jumpanimation1.loop = THREE.LoopOnce;
        jumpanimation1.play();
        jumpanimation1.paused = true;
        // console.log(jumpanimation1);
        break;
      case "mixer2":
        mixer2 = new THREE.AnimationMixer(gltf.scene);
        jumpanimation2 = mixer2.clipAction(gltf.animations[0]);
        jumpanimation2.timeScale = 2;
        jumpanimation2.time = 0;
        jumpanimation2.loop = THREE.LoopOnce;
        jumpanimation2.play();
        jumpanimation2.paused = true;
        // console.log(jumpanimation2);
        //freeze animation at frame 1
        // jumpanimation2.pause()

        // jumpanimation2.stop();
        break;
      case "mixer3":
        mixer3 = new THREE.AnimationMixer(gltf.scene);
        jumpanimation3 = mixer3.clipAction(gltf.animations[0]);
        jumpanimation3.timeScale = 2;
        jumpanimation3.time = 0;
        jumpanimation3.loop = THREE.LoopOnce;
        jumpanimation3.play();
        jumpanimation3.paused = true;
        // console.log(jumpanimation3);
        // setTimeout(() => {
        //                 jumpanimation3.pause=true;

        // }, 1000);
        break;
      case "mixer4":
        mixer4 = new THREE.AnimationMixer(gltf.scene);
        jumpanimation4 = mixer4.clipAction(gltf.animations[0]);
        jumpanimation4.timeScale = 2;
        jumpanimation4.time = 0;
        jumpanimation4.loop = THREE.LoopOnce;
        jumpanimation4.play();
        jumpanimation4.paused = true;
        // console.log(jumpanimation4);
        // jumpanimation4.play();
        break;
      case "mixer5":
        mixer5 = new THREE.AnimationMixer(gltf.scene);
        jumpanimation5 = mixer5.clipAction(gltf.animations[0]);
        jumpanimation5.timeScale = 2;
        jumpanimation5.time = 0;
        jumpanimation5.loop = THREE.LoopOnce;
        jumpanimation5.play();
        jumpanimation5.paused = true;
        break;
      case "mixer6":
        mixer6 = new THREE.AnimationMixer(gltf.scene);
        jumpanimation6 = mixer6.clipAction(gltf.animations[0]);
        jumpanimation6.timeScale = 2;
        jumpanimation6.time = 0;
        jumpanimation6.loop = THREE.LoopOnce;
        jumpanimation6.play();
        jumpanimation6.paused = true;
        // console.log(jumpanimation6);
        // jumpanimation6.play();
        break;
      case "mixer7":
        mixer7 = new THREE.AnimationMixer(gltf.scene);
        jumpanimation7 = mixer7.clipAction(gltf.animations[0]);
        jumpanimation7.timeScale = 2;
        jumpanimation7.time = 0;
        jumpanimation7.loop = THREE.LoopOnce;
        jumpanimation7.play();
        jumpanimation7.paused = true;
        // jumpanimation6.play();
        break;
    }

    let birdNumber = gltf.scene;
    //go through the children of bird1 and find a child named body
    birdNumber.children[0].children.forEach((child) => {
      if (child.name === "body") {
        let body = child;
        body.children.forEach((child) => {
          if (child.name === "Plane003") {
            let body2 = child;
            // console.log(body2.material.color);
            //give a random number from 0 to number of colors in birdColors
            let randomColor = Math.floor(Math.random() * birdColors.length);
            body2.material.color = birdColors[randomColor];
            // console.log(body2.material.color);
          }
        });
      }

      birdNumber.position.set(
        stand.position.x,
        stand.position.y + 1.1,
        stand.position.z
      );
      switch (birdMixer) {
        case "mixer1":
          bird1 = birdNumber;
          pole.add(bird1);
          break;
        case "mixer2":
          bird2 = birdNumber;
          pole.add(bird2);
          break;
        case "mixer3":
          bird3 = birdNumber;
          pole.add(bird3);
          break;
        case "mixer4":
          bird4 = birdNumber;
          pole.add(bird4);
          break;
        case "mixer5":
          bird5 = birdNumber;
          pole.add(bird5);
          break;
        case "mixer6":
          bird6 = birdNumber;
          pole.add(bird6);
          break;
        case "mixer7":
          bird7 = birdNumber;
          pole.add(bird7);
          break;
      }

      // console.log(birdMixer);
    });
  });
}

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 2.4);
scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8)
// directionalLight.castShadow = true
// directionalLight.shadow.mapSize.set(1024, 1024)
// directionalLight.shadow.camera.far = 15
// directionalLight.shadow.camera.left = - 7
// directionalLight.shadow.camera.top = 7
// directionalLight.shadow.camera.right = 7
// directionalLight.shadow.camera.bottom = - 7
// directionalLight.position.set(5, 5, 5)
// scene.add(directionalLight)

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Controls
// const controls = new OrbitControls(camera, canvas);
// controls.target.set(0, 20, 0);
// controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();
let previousTime = 0;

const tick = () => {
  raycaster.setFromCamera(mouse, camera, 0.1, 1000);

  if (bird != null) {
    birdIntersect = raycaster.intersectObject(bird);
    // console.log(hornIntersect)
    if (birdIntersect.length > 0 && trigger == "on") {
      trigger = "off";

      // jumpanimation3.time = 0;

      // jumpanimation4.play();
      jumpanimation.paused = false;
      sound1.play();
      scene.background = background3
      setTimeout(() => {
        trigger = "on";
        jumpanimation.reset();
        jumpanimation.time = 0;
        jumpanimation.paused = true;
      }, 1000);
    }
  }

  if (bird2 != null) {
    bird2Intersect = raycaster.intersectObject(bird2);
    // console.log(hornIntersect)
    if (bird2Intersect.length > 0 && trigger2 == "on") {
      trigger = "off";

      // jumpanimation3.time = 0;

      // jumpanimation4.play();
      jumpanimation2.paused = false;
      sound3.play()
            scene.background = background3;


      setTimeout(() => {
        trigger = "on";
        jumpanimation2.reset();
        jumpanimation2.time = 0;
        jumpanimation2.paused = true;
      }, 1000);
    }
  }

  if (bird1 != null) {
    bird1Intersect = raycaster.intersectObject(bird1);
    // console.log(hornIntersect)
    if (bird1Intersect.length > 0 && trigger1 == "on") {
      trigger1 = "off";
      sound2.play()
            scene.background = background4;

      // jumpanimation3.time = 0;

      // jumpanimation4.play();
      jumpanimation1.paused = false;

      setTimeout(() => {
        trigger1 = "on";
        jumpanimation1.reset();
        jumpanimation1.time = 0;
        jumpanimation1.paused = true;
      }, 1000);
    }
  }

  if (bird3 != null) {
    bird3Intersect = raycaster.intersectObject(bird3);
    // console.log(hornIntersect)
    if (bird3Intersect.length > 0 && trigger3 == "on") {
      trigger3 = "off";

      // jumpanimation3.time = 0;

      // jumpanimation4.play();
      jumpanimation3.paused = false;
      sound4.play()
      scene.background = background4;


      setTimeout(() => {
        trigger3 = "on";
        jumpanimation3.reset();
        jumpanimation3.time = 0;
        jumpanimation3.paused = true;
      }, 1000);
    }
  }

  if (bird4 != null) {
    bird4Intersect = raycaster.intersectObject(bird4);
    // console.log(hornIntersect)
    if (bird4Intersect.length > 0 && trigger4 == "on") {
      trigger4 = "off";
 
      // jumpanimation3.time = 0;

      // jumpanimation4.play();
      jumpanimation4.paused = false;
      sound5.play()
      scene.background = background3;


      setTimeout(() => {
        trigger4 = "on";
        jumpanimation4.reset();
        jumpanimation4.time = 0;
        jumpanimation4.paused = true;
      }, 1000);
    }
  }
  if (bird5 != null) {
    bird5Intersect = raycaster.intersectObject(bird5);
    // console.log(hornIntersect)
    if (bird5Intersect.length > 0 && trigger5 == "on") {
      trigger5 = "off";

      // jumpanimation3.time = 0;

      // jumpanimation4.play();
      sound6.play()
            scene.background = background4;

      jumpanimation5.paused = false;

      setTimeout(() => {
        trigger5 = "on";
        jumpanimation5.reset();
        jumpanimation5.time = 0;
        jumpanimation5.paused = true;
      }, 1000);
    }
  }
  if (bird6 != null) {
    bird6Intersect = raycaster.intersectObject(bird6);
    // console.log(hornIntersect)
    if (bird6Intersect.length > 0 && trigger6 == "on") {
      trigger6 = "off";

      // jumpanimation3.time = 0;

      // jumpanimation4.play();
      sound7.play()
            scene.background = background3;

      jumpanimation6.paused = false;

      setTimeout(() => {
        trigger6 = "on";
        jumpanimation6.reset();
        jumpanimation6.time = 0;
        jumpanimation6.paused = true;
      }, 1000);
    }
  }
  if (bird7 != null) {
    bird7Intersect = raycaster.intersectObject(bird7);
    // console.log(hornIntersect)
    if (bird7Intersect.length > 0 && trigger7 == "on") {
      trigger7 = "off";

      // jumpanimation3.time = 0;

      // jumpanimation4.play();
      jumpanimation7.paused = false;
      sound8.play();
            scene.background = background4;


      setTimeout(() => {
        trigger7 = "on";
        jumpanimation7.reset();
        jumpanimation7.time = 0;
        jumpanimation7.paused = true;
      }, 1000);
    }
  }

  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;
  if (mixer) {
    mixer.update(deltaTime);
  }
  if (mixer1) {
    mixer1.update(deltaTime);
  }
  if (mixer2) {
    mixer2.update(deltaTime);
  }

  if (mixer3) {
    mixer3.update(deltaTime);
  }

  if (mixer4) {
    mixer4.update(deltaTime);
  }

  if (mixer5) {
    mixer5.update(deltaTime);
  }
  if (mixer6) {
    mixer6.update(deltaTime);
  }

  if (mixer7) {
    mixer7.update(deltaTime);
  }

  // Update controls
  // controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);

  console.log("camera")
  // console.log(camera.position)
  // console.log(camera.rotateOnAxis)
  console.log(camera)
};

tick();
