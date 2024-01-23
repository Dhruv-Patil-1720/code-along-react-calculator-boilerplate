import React,{useReducer} from 'react'
import "./Calculator.css"
const initstate={
    inputs:"",
    result:""
}
let operators=["+","-","/","*"]
function reducer(state=initstate,{type,payload}){
    switch(type){
        case "ADDINP":{
            let addOps=true;
            if(operators.includes(payload)&& operators.includes(state.inputs.slice(state.inputs.length-1,state.inputs.length))){
                addOps=false
            }
            else{
                addOps=true
            }
            if(addOps){
                return{...state,inputs:state.inputs+payload}
            }
            return {...state}

        }
        case "CALCULATE" :{
            const inpLen = state.inputs.length;
            if(!operators.includes(state.inputs.slice(inpLen-1,inpLen))){
                try{
                    const result =eval(state.inputs)

                if(!Number.isFinite(result)){
                    throw new error ("Cannot Divide by Zero")
                }
                const newInp={
                    ...state,
                    result:"",
                    inputs:result.toString()
                }
                return newInp
                }catch(error){
                    console.log(error)

                }
            }
            else{
                return{
                    ...state,
                    inputs:eval(state.inputs,slice(0,inpLen-1)).toString(),
                    result:""
                }
            }

        }
        case "DELETE":{
            return {
                ...state,
                inputs:state.inputs.slice(0,state.inputs.length-1)
            }

        }
        case "CLEAR" :{
            return{...state,inputs:"",result:""}

        }
        default :{
            return state;
        }
    }

}
const Calculator = () => {
    const [state,dispatch]=useReducer(reducer,initstate)
    let handelClick=(val)=>{
        dispatch({type:"ADDINP",payload:val})
    }
    let handelClear=()=>{
        dispatch({type:"CLEAR"})
    }
    let handelDel=()=>{
        dispatch({type:"DELETE"})
    }
    let handelCal=()=>{
        dispatch({type:"CALCULATE"})
    }
  return (
    <>
    <div className='main'>
    <div className='container'>
        <div className='display'>
        <p name="user-input" id="user-input">{state.inputs}</p>
        </div>
        <div className='keyboard'>
        <div className="calc-keys">
    <button type="button"  onClick={handelClear} className="others operations">AC</button>
    <button type="button" onClick={handelDel} className="others operations">DEL</button>
    <button type="button"  onClick={()=>handelClick("%")} className="others operations">%</button>
    <button type="button" onClick={()=>handelClick("/")}  className="operate operations">/</button>
    <button type="button"  onClick={()=>handelClick("7")} className="numbers">7</button>
    <button type="button"  onClick={()=>handelClick("8")} className="numbers">8</button>
    <button type="button"  onClick={()=>handelClick("9")} className="numbers">9</button>
    <button type="button"  onClick={()=>handelClick("*")}  className="operate operations">*</button>
    <button type="button"  onClick={()=>handelClick("4")} className="numbers">4</button>
    <button type="button"  onClick={()=>handelClick("5")}  className="numbers">5</button>
    <button type="button"  onClick={()=>handelClick("6")}  className="numbers">6</button>
    <button type="button"  onClick={()=>handelClick("-")} className="operate operations">-</button>
    <button type="button"  onClick={()=>handelClick("1")} className="numbers">1</button>
    <button type="button"  onClick={()=>handelClick("2")}  className="numbers">2</button>
    <button type="button"  onClick={()=>handelClick("3")}  className="numbers">3</button>
    <button type="button"  onClick={()=>handelClick("+")} className="operate operations">+</button>
    <button type="button"  onClick={()=>handelClick("0")}  className="key-zero numbers">0</button>
    <button type="button"  onClick={()=>handelClick(".")}  className="numbers">.</button>
    <button type="button" onClick={handelCal} className="operate operations">=</button>
</div>
        </div>
    </div>
    </div>
    
    
    
    </>
  )
}

export default Calculator