import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import counterSlice from '../redux/counterSlice';
const actions = counterSlice.actions;
function CounterRedux(){
  //get updated value of state
//   const count = useSelector((store) => {
//     console.log(store);
//     return store.counterState.count
//   });

  const count = useSelector((store) => store.counterState.count);

  const dispatch = useDispatch();


    const handleIncrement = () => {
        console.log("increment will happen");
        dispatch(actions.increment());
    }
    
    const handleDecrement = () => {
        console.log("decrement will happen");
        dispatch(actions.decrement(2));
    }
    return(
        <>
            <button onClick = {handleIncrement}> + </button>
            <h3>{count}</h3>
            <button onClick = {handleDecrement}> - </button>
        </>
    )
}

export default CounterRedux