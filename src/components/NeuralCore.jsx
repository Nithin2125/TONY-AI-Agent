import { Canvas, useFrame } from "@react-three/fiber";

import {
  Float,
  Sphere,
  MeshDistortMaterial,
  OrbitControls,
  Environment
} from "@react-three/drei";

import { useRef } from "react";

import OceanParticles from "./OceanParticles";

import OceanBackground from "./OceanBackground";





function ReactorCore(){


  const core = useRef();



  useFrame((state)=>{


    if(core.current){


      core.current.rotation.y += 0.004;


      core.current.rotation.x =

      Math.sin(
        state.clock.elapsedTime * 0.4
      ) * 0.15;


    }


  });





  return (

    <>


      <Float

        speed={2}

        rotationIntensity={1.5}

        floatIntensity={2}

      >



        <Sphere

          ref={core}

          args={[1.15,128,128]}

        >



          <MeshDistortMaterial


            color="#00C2D7"


            emissive="#007080"


            emissiveIntensity={2.5}



            roughness={0.12}



            metalness={0.85}



            distort={0.45}



            speed={3}


          />



        </Sphere>



      </Float>








      {/* HORIZONTAL ENERGY RING */}


      <mesh

        rotation={[

          Math.PI / 2,

          0,

          0

        ]}

      >


        <torusGeometry

          args={[

            1.6,

            0.018,

            64,

            220

          ]}

        />


        <meshStandardMaterial


          color="#7DE2D1"


          emissive="#00C2D7"


          emissiveIntensity={5}


        />


      </mesh>









      {/* VERTICAL ENERGY RING */}



      <mesh

        rotation={[

          0,

          Math.PI / 2,

          0

        ]}

      >


        <torusGeometry

          args={[

            1.75,

            0.012,

            64,

            220

          ]}

        />



        <meshStandardMaterial


          color="#00C2D7"


          emissive="#00C2D7"


          emissiveIntensity={4}


        />



      </mesh>



    </>


  );


}









function NeuralCore(){



  return (


    <div className="neural-core">



      <Canvas


        camera={{


          position:[0,0,5],


          fov:45


        }}



      >





        <ambientLight

          intensity={0.7}

        />







        <pointLight


          position={[

            3,

            4,

            3

          ]}



          intensity={6}



          color="#00C2D7"



        />







        <pointLight


          position={[

            -4,

            -2,

            -3

          ]}



          intensity={4}



          color="#7DE2D1"



        />








        <OceanBackground />







        <OceanParticles />







        <ReactorCore />







        <Environment

          preset="night"

        />







        <OrbitControls


          enableZoom={false}


          autoRotate


          autoRotateSpeed={0.35}


        />





      </Canvas>







      <h2>

        TONY Neural Core

      </h2>




      <p>

        Ocean Intelligence Reactor Active

      </p>







      <div className="processing">


        Processing Capability


        <strong>

          94%

        </strong>



      </div>






    </div>


  );


}



export default NeuralCore;