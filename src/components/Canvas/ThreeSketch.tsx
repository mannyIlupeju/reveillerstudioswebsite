import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { useCanvas } from '@/Context/context/CanvasContext';
import LocationDate from "../../../helper-functions/getCurrentTime/location-date/location-date";

<<<<<<< HEAD
=======
type videoType = {
    src: string,
    preload: boolean,
}

>>>>>>> origin/main

const ThreeSketch = () => {
  const { backgroundCanvasRef } = useCanvas()
  const modelRef = useRef<THREE.Group | null>(null);
<<<<<<< HEAD
=======
  
>>>>>>> origin/main

  
  useEffect(() => {

    if(!backgroundCanvasRef.current){
      console.warn("backgroundCanvasRef.current is not set")
      return;
    }

<<<<<<< HEAD
    const canvas = backgroundCanvasRef.current;
    if (!canvas) return;

=======
>>>>>>> origin/main
    
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xd3d3d3); // Dark gray  

<<<<<<< HEAD

=======
>>>>>>> origin/main
    const aspect = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

<<<<<<< HEAD
=======

    const canvas = backgroundCanvasRef.current;
    if (!canvas) return;

>>>>>>> origin/main
    const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height);
    scene.add(camera);
    camera.position.z = 5;

<<<<<<< HEAD
  
=======
    //Video background but actually Video model
    // const videoGroup = new THREE.Group();
    // scene.add(videoGroup)

    // const video = document.createElement("video");
    // video.src="/rvryulcal.mp4"
    // video.loop= true;
    // video.muted=true;
    // video.play();

    // const videoTexture = new THREE.VideoTexture(video);
    // videoTexture.minFilter = THREE.LinearFilter;
    // videoTexture.magFilter = THREE.LinearFilter;
    // videoTexture.generateMipmaps = false;

    // const videoGeometry = new THREE.PlaneGeometry(90, 60);
    // const videoMaterial = new THREE.MeshBasicMaterial({map: videoTexture});
    // const videoMesh = new THREE.Mesh(videoGeometry, videoMaterial);
    // videoMesh.position.set(0,0,-10);
    // videoGroup.add(videoMesh);
  
    
    const modelGroup = new THREE.Group()
    scene.add(modelGroup)

    
>>>>>>> origin/main

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/examples/jsm/libs/draco/");
    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    gltfLoader.load(
      "/models/GLTF/rvr3dmetallight.gltf",
      (gltf) => {
        modelRef.current = gltf.scene;
        updateModelScale();
<<<<<<< HEAD
        scene.add(modelRef.current);
=======
        modelGroup.add(modelRef.current);
>>>>>>> origin/main
      },
      undefined,
      (error) => {
        console.error("An error occurred while loading the model:", error);
      }
    );

    const controls = new OrbitControls(camera, canvas);
<<<<<<< HEAD
    controls.autoRotate = true;
=======
   
>>>>>>> origin/main
    controls.enableZoom = false;


    function updateModelScale() {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const scaleFactor = Math.min(windowWidth / 50, windowHeight / 50);
      if (modelRef.current) {
        modelRef.current.scale.set(scaleFactor * 2, scaleFactor * 2, scaleFactor * 2);
      }
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 3);
    scene.add(ambientLight);


    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));



    const handleResize = () => {
      aspect.width = window.innerWidth;
      aspect.height = window.innerHeight;
      camera.aspect = aspect.width / aspect.height;
      camera.updateProjectionMatrix();
      renderer.setSize(aspect.width, aspect.height);
      // renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      updateModelScale();
    };

    window.addEventListener("resize", handleResize);

    // Add Clock to calculate delta time for controls update
        const rotationSpeed = 0.001; // Control speed of the rotation


        // Animate the scene
        const animate = () => {
            requestAnimationFrame(animate);

            // Rotate the model if it's loaded
<<<<<<< HEAD
           if (modelRef.current) {
            modelRef.current.rotation.z = Math.PI * Math.sin(rotationSpeed) * 2 
        }
=======
            modelGroup.rotation.y += 0.01;
            

           
>>>>>>> origin/main

            controls.update()
            renderer.render(scene, camera);
        };
        
<<<<<<< HEAD
          animate();

         return () => {
=======
        animate();

        return () => {
>>>>>>> origin/main
            window.removeEventListener("resize", handleResize);
        };
  }, [backgroundCanvasRef]);

  return (
    <>
      <canvas ref={backgroundCanvasRef}/>
<<<<<<< HEAD
      <div className="bg-gray-200 absolute bottom-12 right-3 p-3">
        <LocationDate/>
      </div>
=======
>>>>>>> origin/main
    </>
  )
};

export default ThreeSketch;