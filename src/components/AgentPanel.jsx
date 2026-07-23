import {
  Cpu,
  Shield,
  Search,
  Briefcase
} from "lucide-react";

import { motion } from "framer-motion";



function AgentPanel({activeAgent,setActiveAgent}){



const agents=[


{
name:"Developer Core",
description:"Code Intelligence",
mode:"Programming Assistant",
icon:Cpu
},


{
name:"Security Core",
description:"Threat Analysis",
mode:"Cyber Defense Agent",
icon:Shield
},


{
name:"Research Core",
description:"Knowledge Engine",
mode:"Research Intelligence",
icon:Search
},


{
name:"Career Core",
description:"Professional Assistant",
mode:"Career Advisor",
icon:Briefcase
}



];





return(



<section className="panel agent-panel">



<h2>
Agent Modules
</h2>






{

agents.map((agent,index)=>{


const Icon=agent.icon;



return(


<motion.div


key={index}



className={

activeAgent.name===agent.name

?

"agent-card active-agent"

:

"agent-card"

}



whileHover={{

scale:1.05

}}



onClick={()=>setActiveAgent(agent)}



>




<Icon size={25}/>



<div>


<h3>
{agent.name}
</h3>


<p>
{agent.description}
</p>



</div>




</motion.div>


)



})


}






</section>



);



}



export default AgentPanel;