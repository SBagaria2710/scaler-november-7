import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: "counterSlice",
    initialState:{
        count: 5,
    },
    //update the state
    //reducer is a function that tells redux how the state should change
    reducers:{
        //in the state we will get the initial state initially and that is updated 
        increment:(state) => {
            state.count+=5;
        },
        decrement:(state, data) => {
            const subtractBy = data.payload || 1
            if (state.count !== 0) {
                state.count = state.count - subtractBy;
            }
        }
    }
});

export default counterSlice



// reducer(state, action){
//     switch(action.type){
//         case "increment":
//             return state+1
//         case "decrement":
//             return state -1;
//     }
// }