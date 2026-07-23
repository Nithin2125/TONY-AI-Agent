import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Plane } from "@react-three/drei";



function OceanSurface(){


  const water = useRef();



  useFrame((state)=>{


    if(water.current){


      water.current.rotation.z =

      Math.sin(
        state.clock.elapsedTime * 0.2
      ) * 0.02;



      water.current.position.y =

      Math.sin(
        state.clock.elapsedTime * 0.5
      ) * 0.05;


    }


  });





  return (


    <Plane

      ref={water}

      args={[20,20,64,64]}

      rotation={[

        -Math.PI / 2,

        0,

        0

      ]}

      position={[0,-2,0]}


    >



      <meshStandardMaterial


        color="#04395E"


        transparent


        opacity={0.35}


        roughness={0.2}


        metalness={0.4}


      />



    </Plane>


  );


}






function OceanBackground(){


  return (


    <>


      <OceanSurface />


      <fog

        attach="fog"

        args={[

          "#021B2B",

          5,

          18

        ]}

      />


    </>


  );


}



export default OceanBackground;