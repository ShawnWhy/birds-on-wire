// create a function to load in the birds
function loadBirds(modelpath, mixer, animation,birdNumber, stand ){

    gltfLoader.load(modelpath, (gltf) => {
      gltf.scene.scale.set(0.005, 0.005, 0.005)
      gltf.scene.rotation.y = Math.PI*.5;
      
      mixer = new THREE.AnimationMixer(gltf.scene);
      console.log(gltf.scene);
      console.log(gltf.animations);
      animation = mixer.clipAction(gltf.animations[0]);
      animation.timeScale = 2;
      console.log(animation);
      birdNumber = gltf.scene;
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

         pole.add(birdNumber);
          birdNumber.position.set(
            stand.position.x,
            stand.position.y+1.1,
            stand.position.z
          );

      

    });
});
}