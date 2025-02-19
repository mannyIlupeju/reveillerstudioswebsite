// import React, { useEffect } from 'react';
// import { useCanvas } from '../../Context/context/CanvasContext';
// import canvasSketch from 'canvas-sketch';
// import Cursor from '../Cursor/cursor';

// const Sketch: React.FC = () => {
  

  
  
//   useEffect(() => {
//     const resizeCanvas = () => {
  
//       if (canvasRef.current) {
//         // canvasRef.current.width = window.innerWidth;
//         // canvasRef.current.height = window.innerHeight;
//         drawImageOnCanvas();
//       }
//     };

  


//     const drawImageOnCanvas = () => {
//       const canvas = canvasRef.current;
//       if (!canvas) return;
      
//       const context = canvas.getContext('2d');
//       if (!context) return;

//       const img = new Image();
//       img.src = '/images/reveillerstudiosmainlogo2.png';
//       img.alt = 'Reveiller logo'
//       img.width = 1200;
//       img.height = 400;
      
     
      
//       img.onload = () => {
        
//         const canvasWidth = canvas.width;
//         const canvasHeight = canvas.height;

//         const screenWidth = window.innerWidth;
//         const screenHeight = window.innerHeight;

       
//         context.fillRect(0, 0, canvas.width, canvas.height);
//         context.fillStyle = 'black';

        

//         // Define breakpoints and sizes
//         let desiredWidth: number;
//         let desiredHeight: number;

//         desiredWidth = 1200;
//         desiredHeight = 400;

//         // Calculate the centered position
//         const dx = (canvasWidth - img.width) * 0.5
//         const dy = (canvasHeight - img.height) * 0.5

        

        
//         context.drawImage(img, dx , dy , desiredWidth, desiredHeight);
//       };
      

//     };

//     const settings = {
//       animate: true,
//       canvas: canvasRef.current,
//     };

//     const sketch = ({ context, width, height }: { context: CanvasRenderingContext2D; width: number; height: number }) => {
//       return ({ context, width, height }: { context: CanvasRenderingContext2D; width: number; height: number }) => {
//         drawImageOnCanvas();
//       };
//     };

//     const manager = canvasSketch(sketch, settings);

//     resizeCanvas();
//     window.addEventListener('resize', resizeCanvas);

//     return () => {
//       manager.then(m => m.unload());
//       window.removeEventListener('resize', resizeCanvas);
//     };
//   }, [canvasRef]);

//   return (
//     <div className=" h-min cursor-pointer">
//       <canvas ref={canvasRef}></canvas>
//       <Cursor />
//     </div>
//   );
// };

// export default Sketch;