import React from 'react';
import useToggler from './useToggler'

function HooksDem(){
     const [isHappy,setIshappy] = useToggler("Happy")
     console.log('Is am Calling after clicking the setIsHappy')
     const [isApple,setApple] = useToggler("Apple")
     //console.log("Happpy",isHappy,setIshappy)
    // console.log("isApple",isApple,setApple)
     
     return(
         <div>
            <p onClick={setIshappy}>{isHappy ? "Happy":"Not Happy"}</p>
            <p onClick={setApple}>{isApple ? "Apple":"Not an Apple"}</p> 
         </div>
     )
}

export default HooksDem