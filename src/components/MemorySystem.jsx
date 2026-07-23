import { useEffect, useState } from "react";

import {
  Database,
  Clock,
  BrainCircuit
} from "lucide-react";

import { motion } from "framer-motion";




function MemorySystem({activeAgent}) {



const [memory,setMemory] = useState([


{
title:"System Initialized",
time:"Just now"
},


{
title:"Ocean Intelligence Core Connected",
time:"Online"
}


]);







useEffect(()=>{


setMemory(prev=>[


{

title:`${activeAgent.name} Activated`,

time:"Current Session"

},


...prev.slice(0,3)


]);



},[activeAgent]);








return(



<section className="panel memory-panel">





<div className="console-header">


<Database size={24}/>



<h2>
TONY Memory Core
</h2>


</div>







<div className="memory-info">


<BrainCircuit size={20}/>


<span>

Memory Connected

</span>



</div>








<div className="memory-list">





{


memory.map((item,index)=>(


<motion.div


key={index}


className="memory-item"


initial={{

opacity:0,

x:-20

}}



animate={{

opacity:1,

x:0

}}



>



<Clock size={16}/>



<div>


<strong>

{item.title}

</strong>


<p>

{item.time}

</p>



</div>



</motion.div>



))



}




</div>






</section>



);



}



export default MemorySystem;