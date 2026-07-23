import { Volume2 } from "lucide-react";

import { motion } from "framer-motion";



function VoiceOutput({text}) {



const speak = ()=>{


if(!window.speechSynthesis){


alert(
"Voice output not supported"
);


return;


}





const speech = new SpeechSynthesisUtterance(text);



speech.rate = 0.95;


speech.pitch = 1;



speech.volume = 1;




window.speechSynthesis.cancel();


window.speechSynthesis.speak(speech);



};






return(


<motion.button


className="voice-output"


whileTap={{

scale:.85

}}



onClick={speak}



>



<Volume2 size={18}/>



</motion.button>


);



}



export default VoiceOutput;