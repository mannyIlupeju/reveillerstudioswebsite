import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { useCanvas } from '@/Context/context/CanvasContext';
import Newsletter from "../Newsletter/Newsletter";
import * as motion from "motion/react-client"


type videoType = {
    src: string,
    preload: boolean,
}


const ThreeSketch = () => {
  const { backgroundCanvasRef } = useCanvas()
  const modelRef = useRef<THREE.Group | null>(null);
  const constraintRef = useRef<HTMLDivElement>(null)

  const [box1Pos, setBox1Pos] = useState({ x: 0, y: 0 });
  const [box2Pos, setBox2Pos] = useState({ x: 0, y: 0 });


  
  useEffect(() => {

    if(!backgroundCanvasRef.current){
      console.warn("backgroundCanvasRef.current is not set")
      return;
    }

    
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xd3d3d3); // Dark gray  

    const aspect = {
      width: window.innerWidth,
      height: window.innerHeight,
    };


    const canvas = backgroundCanvasRef.current;
    if (!canvas) return;

    const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height);
    scene.add(camera);
    camera.position.z = 5;

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

    

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/examples/jsm/libs/draco/");
    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    gltfLoader.load(
      "/models/GLTF/10rvr3dlogoMetal.gltf",
      (gltf) => {
        modelRef.current = gltf.scene;
        updateModelScale();
        modelGroup.add(modelRef.current);
      },
      undefined,
      (error) => {
        console.error("An error occurred while loading the model:", error);
      }
    );

    const controls = new OrbitControls(camera, canvas);
   
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
            modelGroup.rotation.y += 0.01;
            controls.update()
            renderer.render(scene, camera);
        };
        
        animate();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
  }, [backgroundCanvasRef]);

  return (
    <>
      <div 
          className="box3 items-center cursor-pointer text-md">
          <p className="ticker-text">
          Stay tuned for New releases coming soon. Sign up for our newsletter and get 10% off
          </p>
        </div>
      

       
      <canvas ref={backgroundCanvasRef} className="relative"/>
        <motion.div 
          drag
          dragConstraints={backgroundCanvasRef}
          dragElastic={0.05}
          onDragEnd={(e, info) => setBox2Pos({ x: info.point.x, y: info.point.y})}
          initial={{ x: -100, y: -400 }}
          animate={{ x: -10, y: 300}}
          transition={{ duration: 2, ease: 'easeIn' }}
          className="box box1 flex  justify-center items-center relative cursor-pointer">
          <video autoPlay loop muted className="videoOverlay absolute inset-0 w-full h-full object-cover z-9">
            
            <source 
            src="/videos/newreleases.MOV"
            />
          </video>
           {/* Overlay */}
          <div className="absolute inset-0 bg-black/20 z-10"></div>

          {/* Text */}
          <h1 className="z-20 text-white text-xl font-bold">New Releases</h1>

        </motion.div>
        <motion.div 
          drag
          dragConstraints={backgroundCanvasRef}
          dragElastic={0.05}
          initial={{ x: 500, y: -500 }}
          animate={{ x: 500, y: 300}}
          transition={{ duration: 1, ease: 'easeIn' }}
          className="box box2 flex justify-center items-center relative cursor-pointer p-4"  
        >
          <video width="300" height="auto" autoPlay loop muted className="videoOverlay absolute inset-0 w-full h-full object-cover z-9">
            
            <source 
            src="/videos/aboutvid1.mov"
            />
          </video>
           {/* Overlay */}
          <div className="absolute inset-0 bg-black/20"></div>

          {/* Text */}
          <h1 className="z-20 text-white text-xl font-bold">About</h1>

        </motion.div>
        
       
       
    </>
  )
};

export default ThreeSketch;