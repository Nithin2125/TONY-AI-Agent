import { useState } from "react";

import {
  Mic,
  MicOff
} from "lucide-react";

import { motion } from "framer-motion";




function VoiceControl({setVoiceText}){


const [listening,setListening] = useState(false);






const startListening = ()=>{


const SpeechRecognition =

window.SpeechRecognition ||

window.webkitSpeechRecognition;



if(!SpeechRecognition){


alert(
"Voice recognition is not supported in this browser"
);


return;


}




const recognition = new SpeechRecognition();



recognition.continuous = false;


recognition.lang = "en-US";



recognition.start();



setListening(true);






recognition.onresult=(event)=>{


const text =

event.results[0][0].transcript;



setVoiceText(text);



setListening(false);



};





recognition.onerror=()=>{


setListening(false);


};





recognition.onend=()=>{


setListening(false);


};



};







return(


<motion.button


className={

listening

?

"voice-button listening"

:

"voice-button"

}



whileTap={{

scale:.9

}}



onClick={startListening}



>



{


listening

?

<MicOff size={22}/>

:

<Mic size={22}/>


}




</motion.button>



);


}



export default VoiceControl;