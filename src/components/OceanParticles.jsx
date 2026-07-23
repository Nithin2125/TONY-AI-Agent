import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";



function OceanParticles() {


  const pointsRef = useRef();



  const particles = new Float32Array(900);



  for(let i=0;i<900;i++){


    particles[i] =

    (Math.random() - 0.5) * 12;



  }




  useFrame((state)=>{


    if(pointsRef.current){


      pointsRef.current.rotation.y =

      state.clock.elapsedTime * 0.03;



      pointsRef.current.rotation.x =

      Math.sin(
        state.clock.elapsedTime * 0.2
      ) * 0.05;



    }


  });






  return (


    <Points

      ref={pointsRef}

      positions={particles}

      stride={3}

    >



      <PointMaterial


        transparent


        color="#7DE2D1"


        size={0.025}


        sizeAttenuation


        depthWrite={false}


      />



    </Points>


  );


}



export default OceanParticles;