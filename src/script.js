import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()
//ANIMATIONS
let mixer ;
let mixer1;
let mixer2 ;
let mixer3 ;
let mixer4 ;
let mixer5 ;
let jumpanimation;
let jumpanimation1;
let jumpanimation2;
let jumpanimation3;
let jumpanimation4;
let jumpanimation5;
let jumpanimation6;

let pole;
let bird1;
let bird2;
let bird3;
let bird4;
let bird5;
let bird6;

let birdPositions = [

]

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Models
 */
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)



//set background color to white
scene.background = new THREE.Color(0xffffff)


gltfLoader.load("/models/telephonepole.glb", (gltf) => {
  gltf.scene.scale.set(50, 50, 50);
  pole = gltf.scene;
  scene.add(pole);
  console.log(gltf.scene);
  let birdstand = gltf.scene.children[2];
  let birdstand1 = gltf.scene.children[3];
  let birdstand2 = gltf.scene.children[4];
  let birdstand3 = gltf.scene.children[5];
  let birdstand4 = gltf.scene.children[6];
  let birdstand5 = gltf.scene.children[7];

  birdPositions.push(birdstand.position);
    birdPositions.push(birdstand1.position);
    birdPositions.push(birdstand2.position);
    birdPositions.push(birdstand3.position);
    birdPositions.push(birdstand4.position);
    birdPositions.push(birdstand5.position);
    console.log(birdPositions);

    gltfLoader.load("/models/birdjump.glb", (gltf) => {
      gltf.scene.scale.set(0.005, 0.005, 0.005)
      gltf.scene.rotation.y = Math.PI*.5;
      
      mixer = new THREE.AnimationMixer(gltf.scene);
      console.log(gltf.animations);
      jumpanimation = mixer.clipAction(gltf.animations[0]);
      jumpanimation.timeScale = 2;
      console.log(jumpanimation);
      jumpanimation.play();

      bird1 = gltf.scene;

      pole.add(bird1);
          bird1.position.set(
            birdstand.position.x,
            birdstand.position.y+1.1,
            birdstand.position.z
          );

      

    });
});

/**
 * Floor
 */



/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 2.4)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.OrthographicCamera(-sizes.width / 2, sizes.width / 2, sizes.height / 2, -sizes.height / 2, -100, 1000)
// const camera = new THREE.PerspectiveCamera(100, sizes.width / sizes.height, 0.1, 1000)
camera.position.set(10, 7, 0)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 7, 0)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    if(mixer)
    {
        mixer.update(deltaTime)
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()