function AgentBrain({message,setActiveAgent}) {



const analyzeCommand = (text)=>{


const command = text.toLowerCase();





if(

command.includes("code") ||

command.includes("python") ||

command.includes("java") ||

command.includes("bug") ||

command.includes("error") ||

command.includes("program")

){



setActiveAgent({

name:"Developer Core",

description:"Code Intelligence",

mode:"Programming Assistant"

});


return "Developer Core activated";

}





if(

command.includes("hack") ||

command.includes("security") ||

command.includes("virus") ||

command.includes("attack") ||

command.includes("threat")

){



setActiveAgent({

name:"Security Core",

description:"Threat Analysis",

mode:"Cyber Defense Agent"

});



return "Security Core activated";

}





if(

command.includes("research") ||

command.includes("study") ||

command.includes("analyze") ||

command.includes("information")

){



setActiveAgent({

name:"Research Core",

description:"Knowledge Engine",

mode:"Research Intelligence"

});



return "Research Core activated";

}





if(

command.includes("job") ||

command.includes("resume") ||

command.includes("career") ||

command.includes("interview")

){



setActiveAgent({

name:"Career Core",

description:"Professional Assistant",

mode:"Career Advisor"

});



return "Career Core activated";

}





return null;



};





return {

analyzeCommand

};



}



export default AgentBrain;