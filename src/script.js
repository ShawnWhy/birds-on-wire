import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import GUI from 'lil-gui'

// Scene
const scene = new THREE.Scene()

 const sizes = {
   width: window.innerWidth,
   height: window.innerHeight,
 };

/**
 * Camera
 */
// Base camera
// const camera = new THREE.OrthographicCamera(-sizes.width / 2, sizes.width / 2, sizes.height / 2, -sizes.height / 2, -100, 1000)
// camera.position.set(10, 7, 0);

const camera = new THREE.PerspectiveCamera(100, sizes.width / sizes.height, 0.1, 1000)
camera.position.set(433.25083968221594, 512.9172604439034, 15.083707406023414)
camera.lookAt(new THREE.Vector3(20, 0, 0))
scene.add(camera)

//raycaster 
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
mouse.x = null;
mouse.y = null;

window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / sizes.width) * 2 - 1;
  mouse.y = -(event.clientY / sizes.height) * 2 + 1;

  console.log(mouse)
});


let birdIntersect
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
let mixer ;
let mixer1;
let mixer2 ;
let mixer3 ;
let mixer4 ;
let mixer5 ;
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
let jumpanimation8;

let pole;
let bird1;
let bird2;
let bird3;
let bird4;
let bird5;
let bird6;
let bird7;
let bird8;


let birdPositions = [

]
let birdColors = []

//add 7 colors that are tints to birdColors
//   birdColors.push({r: Math.random(), g: Math.random(), b: Math.random(), isColor: true});

for(let i = 0; i < 7; i++){
  //   birdColors.push(new THREE.Color(0xffffff).offsetHSL(0, 0, 0.1*i));
    birdColors.push({r: Math.random(), g: Math.random(), b: Math.random(), isColor: true});
}
// Canvas
const canvas = document.querySelector('canvas.webgl')



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
      console.log(gltf.scene);
      console.log(gltf.animations);
      jumpanimation = mixer.clipAction(gltf.animations[0]);
      jumpanimation.timeScale = 2;
      console.log(jumpanimation);
      jumpanimation.play();
      bird1 = gltf.scene;
      //go through the children of bird1 and find a child named body
        bird1.children[0].children.forEach((child) => {
            if(child.name === "body"){
                let body = child;
                body.children.forEach((child) => {
                    if(child.name === "Plane003"){
                        let body2 = child;
                        console.log(body2.material.color);
                        //give a random number from 0 to number of colors in birdColors
                        let randomColor = Math.floor(Math.random() * birdColors.length);
                        body2.material.color = birdColors[randomColor];
                        console.log(body2.material.color);
                    }
                });
            }



         pole.add(bird1);
          bird1.position.set(
            birdstand.position.x,
            birdstand.position.y+1.1,
            birdstand.position.z
          );

      

    });

    loadBirds("/models/birdjump.glb", "mixer1",  birdstand1);
    loadBirds("/models/birdjump.glb", "mixer2",  birdstand2);
    loadBirds("/models/birdjump.glb", "mixer3",  birdstand3);
    loadBirds("/models/birdjump.glb", "mixer4",  birdstand4);
    loadBirds("/models/birdjump.glb", "mixer5",  birdstand5);
    // loadBirds("/models/birdjump.glb", mixer6, jumpanimation6, bird7, birdstand6);

    
});
})

/**
 * Floor
 */
// create a function to load in the birds
// create a function to load in the birds
function loadBirds(modelpath, birdMixer, stand ){

    gltfLoader.load(modelpath, (gltf) => {
      gltf.scene.scale.set(0.005, 0.005, 0.005)
      gltf.scene.rotation.y = Math.PI*.5;
      
      switch(birdMixer){
        case "mixer1":
            mixer1 = new THREE.AnimationMixer(gltf.scene);
            jumpanimation1 = mixer1.clipAction(gltf.animations[0]);
            jumpanimation1.timeScale = 2;
            jumpanimation1.play();
            break;
        case "mixer2":
            mixer2 = new THREE.AnimationMixer(gltf.scene);
            jumpanimation2 = mixer2.clipAction(gltf.animations[0]);
            jumpanimation2.timeScale = 2;
            //freeze animation at frame 1
            // jumpanimation2.pause()

            jumpanimation2.stop();
            break;
        case "mixer3":
            mixer3 = new THREE.AnimationMixer(gltf.scene);
            jumpanimation3 = mixer3.clipAction(gltf.animations[0]);
            jumpanimation3.timeScale = 2;
            jumpanimation3.time = 0;
            jumpanimation3.loop = THREE.LoopOnce;
            jumpanimation3.play()
            jumpanimation3.paused = true;
            console.log(jumpanimation3)
            // setTimeout(() => {
            //                 jumpanimation3.pause=true;

            // }, 1000);
            break;
        case "mixer4":
            mixer4 = new THREE.AnimationMixer(gltf.scene);
            jumpanimation4 = mixer4.clipAction(gltf.animations[0]);
            jumpanimation4.timeScale = 2;
            // jumpanimation4.play();
            break;
        case "mixer5":
            mixer5 = new THREE.AnimationMixer(gltf.scene);
            jumpanimation5 = mixer5.clipAction(gltf.animations[0]);
            jumpanimation5.timeScale = 2;
            // jumpanimation5.play();
            break;
        case "mixer6":
            mixer6 = new THREE.AnimationMixer(gltf.scene);
            jumpanimation6 = mixer6.clipAction(gltf.animations[0]);
            jumpanimation6.timeScale = 2;
            // jumpanimation6.play();
            break;
    }

      let birdNumber = gltf.scene;
      //go through the children of bird1 and find a child named body
        birdNumber.children[0].children.forEach((child) => {
            if(child.name === "body"){
                let body = child;
                body.children.forEach((child) => {
                    if(child.name === "Plane003"){
                        let body2 = child;
                        console.log(body2.material.color);
                        //give a random number from 0 to number of colors in birdColors
                        let randomColor = Math.floor(Math.random() * birdColors.length);
                        body2.material.color = birdColors[randomColor];
                        console.log(body2.material.color);
                    }
                });
            }
      
          birdNumber.position.set(
            stand.position.x,
            stand.position.y+1.1,
            stand.position.z
          );
            switch(birdMixer){
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
        }

                
         
    console.log(birdMixer)
      console.log(bird1, bird2, bird3, bird4, bird5, bird6, bird7);

    });
});
}


/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 2.4)
scene.add(ambientLight)

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
    raycaster.setFromCamera(mouse, camera, 0.1, 1000);

      if (bird3 != null) {
        bird3Intersect = raycaster.intersectObject(bird3);
        // console.log(hornIntersect)
        if (bird3Intersect.length > 0) {
            console.log("bird3Intersect");
            console.log(bird3Intersect);
                            // jumpanimation3.time = 0;

            // jumpanimation4.play();
            jumpanimation3.paused = false;

            setTimeout(() => {
                jumpanimation4.reset();
                jumpanimation3.time=0;
                jumpanimation3.paused = true;
            }, 1000);
            
          }
        }
      
    
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime
   if (mixer) {
     mixer.update(deltaTime);
   }
    if(mixer1)
    {
        mixer1.update(deltaTime)
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

console.log(camera)
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()