import React,{useState} from 'react';

function useToggler(initialVal){
     console.log("Toggler",initialVal)
     const[state,setState] = useState(initialVal)
     const toggler = ()=>{
          console.log("calling toogler",state)
          setState(state+"s")
     }
     return [state,toggler]
}

export default useToggler;