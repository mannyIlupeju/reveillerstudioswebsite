// import React, { useRef, useEffect } from 'react';
// import canvasSketch from "canvas-sketch";
// import { useCanvas } from '@/Context/context/CanvasContext';
// import * as THREE from 'three';

// interface SketchProps {
//     context: CanvasRenderingContext2D;
//     width: number;
//     height: number;
//     time?: number;
// }

// interface SketchSettings {
//     dimensions: [number, number],  
//     animate: boolean,
//     fps: number,
//     canvas: HTMLCanvasElement | null
// }

// type SketchManager = {
//     loadAndRun: () => Promise<void>;
//     update: (props?: Partial<SketchProps>) => void;
//     start: () => void;
//     pause: () => void;
//     unload: () => void;
// };

// interface CanvasBackgroundProps {
//     scene: THREE.Scene,
//     onBackgroundReady: (scene: THREE.Scene) => void
// }

// const CanvasBackground: React.FC<CanvasBackgroundProps> = ({ scene, onBackgroundReady }) => {
   

//     useEffect(() => {
       

//         let texture: THREE.CanvasTexture | null = null;
//         let animationFrameId: number;
//         let currentManager: SketchManager | null = null;

//         const settings: SketchSettings = {
//             dimensions: [window.innerWidth, window.innerHeight],  
//             animate: true,
//             fps: 24,
            
//         };

       
//     }, [ onBackgroundReady]);

//     return null;
// };

// export default CanvasBackground;
