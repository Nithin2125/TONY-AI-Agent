import { signInWithPopup } from "firebase/auth";

import {
  auth,
  googleProvider
} from "../firebase";


import {
  LogIn,
  ShieldCheck
} from "lucide-react";

import { motion } from "framer-motion";





function Login({setUser}) {



const googleLogin = async()=>{


try{


const result = await signInWithPopup(

auth,

googleProvider

);



setUser(result.user);



}

catch(error){


console.log(error);


}


};







return(



<div className="login-screen">





<motion.div


className="login-card"



initial={{

opacity:0,

scale:.8

}}



animate={{

opacity:1,

scale:1

}}



>






<div className="login-logo">


<ShieldCheck size={45}/>


</div>







<h1>
TONY
</h1>



<p>
Autonomous Intelligence System
</p>








<button


onClick={googleLogin}



>



<LogIn size={20}/>



Continue with Google



</button>







</motion.div>







</div>



);



}



export default Login;