import React, { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import GifLoader from "three-gif-loader";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Header from "./header";
import Footer from "./footer";
import ColorChanger from "./colorChanger";
import "../public/styles.css";
// import Stats from "stats.js";
// import { PlainAnimator } from "three-plain-animator/lib/plain-animator";

function App() {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  // let activeCameraRef = useRef(null);
  const [colorChangerIsVisible, setColorChangerIsVisible] = useState(false);
  // const [areDoorsOpen, setAreDoorsOpen] = useState(false);
  let areDoorsOpenRef = useRef(false);
  const animationActionRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    let new_mesh;

    //renderer
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    //scene
    const scene = new THREE.Scene();

    //camera
    const camera = new THREE.PerspectiveCamera(
      35,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    camera.position.set(2, 1, 3);

    //controls
    const controls = new OrbitControls(camera, canvasRef.current);
    controls.enableDamping = true;
    controls.dampingFactor = 0.35;
    controls.enablePan = false;
    controls.minPolarAngle = Math.PI * 0.25;
    controls.maxPolarAngle = Math.PI * 0.465;
    // controls.minAzimuthAngle = Math.PI * 0.25 * -1;
    // controls.maxAzimuthAngle = Math.PI * 0.25;
    controls.minDistance = 3;
    controls.maxDistance = 4;

    // const textureLoader = new THREE.TextureLoader();
    // const voronoi_texture = textureLoader.load(
    //   "./src/assets/textures/voronoi_texture.png"
    // );
    //UIElements

    ///////////////////////////////////////////////////

    // const texturePath = "./src/assets/uiElements/Final_GIF/Sprite_Sheet_00.png";
    // const spriteTexture = new THREE.TextureLoader().load(texturePath);
    // const testPlaneGeometry = new THREE.PlaneGeometry(1, 1);
    // const animator = new PlainAnimator(spriteTexture, 4, 4, 10, 10);
    // const testTexture = animator.init();
    // const testPlaneMaterial = new THREE.MeshBasicMaterial({
    //   map: testTexture,
    //   transparent: true,
    // });
    // const testPlane = new THREE.Mesh(testPlaneGeometry, testPlaneMaterial);
    // scene.add(testPlane);
    // testPlane.position.set(2, 0, 0);

    //////////////////////////// load the hdr image for environment////////////////////////////////////
    new RGBELoader().load(
      "./src/assets/textures/paul_lobe_haus_2k.hdr",
      function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
        scene.background = texture;
      }
    );

    // instantiate a loader
    const Gifloader = new GifLoader();

    // load a gif image resource
    //////////////////////////////////////////////paint gun gif////////////////////////////////////////////
    const paintGunTexture = Gifloader.load(
      // resource URL
      "./src/assets/uiElements/Final_GIF/Paint.gif",

      // onLoad callback
      function (reader) {
        console.log(reader.numFrames());
      },

      // onProgress callback
      function (xhr) {
        console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
      },

      // onError callback
      function () {
        console.error("An error happened.");
      }
    );

    const geometryPaintGun = new THREE.PlaneGeometry(0.2382, 0.1684);
    const materialPaintGun = new THREE.MeshBasicMaterial({
      map: paintGunTexture,
      transparent: true,
    });

    const paintGun = new THREE.Mesh(geometryPaintGun, materialPaintGun);
    paintGun.name = "paintGun";
    scene.add(paintGun);

    paintGun.position.set(0.57, 0.18, 0.6);

    ///////////////////////////////////////////////headLights gif//////////////////////////////////////////////
    const headLightsTexture = Gifloader.load(
      // resource URL
      "./src/assets/uiElements/Final_GIF/Light.gif",

      // onLoad callback
      function (reader) {
        console.log(reader.numFrames());
      },

      // onProgress callback
      function (xhr) {
        console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
      },

      // onError callback
      function () {
        console.error("An error happened.");
      }
    );
    const geometryHeadLight = new THREE.PlaneGeometry(0.2382, 0.1684);
    const materialHeadLight = new THREE.MeshBasicMaterial({
      map: headLightsTexture,
      transparent: true,
    });

    const headLight = new THREE.Mesh(geometryHeadLight, materialHeadLight);
    headLight.name = "headLight";
    scene.add(headLight);

    headLight.position.set(0.55, 0.04, 1);

    //////////////////////////////////////////////open door gif////////////////////////////////////////////
    const openDoorTexture = Gifloader.load(
      // resource URL
      "./src/assets/uiElements/Final_GIF/Open_Door_Final.gif",

      // onLoad callback
      function (reader) {
        console.log(reader.numFrames());
      },

      // onProgress callback
      function (xhr) {
        console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
      },

      // onError callback
      function () {
        console.error("An error happened.");
      }
    );
    const geometryOpenDoor = new THREE.PlaneGeometry(0.2382, 0.1684);
    const materialOpenDoor = new THREE.MeshBasicMaterial({
      map: openDoorTexture,
      transparent: true,
    });

    const openDoor = new THREE.Mesh(geometryOpenDoor, materialOpenDoor);
    openDoor.name = "openDoor";
    scene.add(openDoor);

    openDoor.position.set(-0.6, 0.18, -0.2);

    //////////////////////////////////////////////interior gif////////////////////////////////////////////
    const interiorIconTexture = Gifloader.load(
      // resource URL
      "./src/assets/uiElements/Final_GIF/Interior.gif",

      // onLoad callback
      function (reader) {
        console.log(reader.numFrames());
      },

      // onProgress callback
      function (xhr) {
        console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
      },

      // onError callback
      function () {
        console.error("An error happened.");
      }
    );
    const geometryInteriorIcon = new THREE.PlaneGeometry(0.2382, 0.1684);
    const materialInteriorIcon = new THREE.MeshBasicMaterial({
      map: interiorIconTexture,
      transparent: true,
    });

    const interiorIcon = new THREE.Mesh(
      geometryInteriorIcon,
      materialInteriorIcon
    );
    interiorIcon.name = "interior";
    scene.add(interiorIcon);

    interiorIcon.position.set(-0.4, 0.48, 0.1);

    /////////////////////////////////////load the gltf model file////////////////////////////////////
    const loader = new GLTFLoader();
    let mixer;

    loader.load(
      "./src/assets/models/Car Dashboard_with animations - Copy.glb",
      function (gltf) {
        const root = gltf.scene;
        scene.add(root);
        console.log(gltf);

        //apply car paint materials
        const mesh = scene.getObjectByName("polySurface3178");
        mesh.material.metalness = 1.0;
        mesh.material.roughness = 0.5;
        mesh.material.clearcoat = 1.0;
        mesh.material.clearcoatRoughness = 0.03;
        // mesh.material.normalMap = voronoi_texture;
        // mesh.material.normalScale = new THREE.Vector2(2, 2);

        mixer = new THREE.AnimationMixer(root);

        const clip_3 = gltf.animations[2];

        animationActionRef.current = mixer.clipAction(clip_3);
        animationActionRef.current.play();
        animationActionRef.current.paused = true;
        animationActionRef.current.setLoop(THREE.LoopOnce);
        animationActionRef.current.clampWhenFinished = true;

        ////////////////////////////////////////////////Animation/////////////////////////////////////////////////////////////////////////////////////////////////////////////
        function animate() {
          requestAnimationFrame(animate);
          controls.update();
          //////////update floating icons orientation////////////
          paintGun.lookAt(camera.position);
          headLight.lookAt(camera.position);
          openDoor.lookAt(camera.position);
          interiorIcon.lookAt(camera.position);
          // animator.animate();

          const delta = clock.getDelta();
          mixer.update(delta);

          renderer.render(scene, camera);
        }

        const clock = new THREE.Clock();
        animate();
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      },
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },

      function (error) {
        console.log("An error happened " + error);
      }
    );

    sceneRef.current = scene;

    /////////////////////////// Add a mousedown event listener///////////////////////////////////////////
    // Create a raycaster
    var raycaster = new THREE.Raycaster();
    renderer.domElement.addEventListener(
      "mousedown",
      onDocumentMouseDown,
      false
    );

    //Event listener for floating icons
    function onDocumentMouseDown(event) {
      console.log("mouse clicked!!!!!!!!!!!!!!!!!!!!!!!");
      // Calculate mouse position in normalized device coordinates
      var mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Set the raycaster origin and direction based on the mouse position
      raycaster.setFromCamera(mouse, camera);

      // Calculate objects intersecting the picking ray
      var intersects = raycaster.intersectObjects(scene.children, true);

      // Check if any intersections occurred
      if (intersects.length > 0) {
        // An intersection occurred, perform your desired action here
        var clickedObject = intersects[0].object;
        if (clickedObject.name == "paintGun") {
          setColorChangerIsVisible((prevValue) => !prevValue);
        } else if (clickedObject.name == "openDoor") {
          setColorChangerIsVisible(false);
          // setAreDoorsopen((prevValue) => !prevValue);

          if (areDoorsOpenRef.current) {
            animationActionRef.current.timeScale = -1;
            animationActionRef.current.paused = false;
          } else {
            animationActionRef.current.timeScale = 1;
            animationActionRef.current.paused = false;
            animationActionRef.current.clampWhenFinished = true;
          }
          areDoorsOpenRef.current = !areDoorsOpenRef.current;
        } else if (clickedObject.name == "headLight") {
          setColorChangerIsVisible(false);
        } else if (clickedObject.name == "interior") {
          setColorChangerIsVisible(false);
        }
      }
    }

    /////////////////////////////////event listener for wheel rim addition////////////////////////////////////
    canvasRef.current.addEventListener("dblclick", () => {
      console.log("button clicked");
      const objectToRemove = scene.getObjectByName("left_front_wheel");
      const parent = objectToRemove.parent;

      if (objectToRemove) {
        parent.remove(objectToRemove);
      }

      console.log(objectToRemove);
      scene.remove(objectToRemove);
      loader.load("./src/assets/models/cube.glb", function (gltf) {
        console.log(gltf);
        new_mesh = gltf.scene;
        console.log(new_mesh);
        scene.add(new_mesh);
      });
    });

    window.addEventListener("resize", onWindowResize, false);

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }, []);

  /////////////////////////////////////////Effect for the color changer animations ///////////////////////////////////////
  useEffect(() => {
    const colorChanger = document.getElementById("color-changer");
    if (!colorChangerIsVisible) {
      colorChanger.style.transform = "translateY(-50%) translateX(-98%)";
    } else {
      colorChanger.style.transform = "translateY(-50%) translateX(0%)";
    }
  }, [colorChangerIsVisible]);

  ///////////////////////////////////////Effect for the doors animations ////////////////////////////////////////////////
  useEffect(() => {});

  const changeColour = (color) => {
    const mesh = sceneRef.current.getObjectByName("polySurface3178");
    mesh.material.color = new THREE.Color(color);
  };

  return (
    <div>
      <div>
        <Header />
        <ColorChanger selectedColor={changeColour} />
        <Footer selectedColor={changeColour} />
      </div>
      <canvas ref={canvasRef} className="canvas" />
    </div>
  );
}

export default App;
