import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";
import todoSlice from "./TodoSlice";
import userSlice from "./userSlice";

const mystore = configureStore({
    reducer:{
        //is a slice of our global store 
        counterState: counterSlice.reducer,    
        todoState: todoSlice.reducer,
        userState: userSlice.reducer
    }
});

export default mystore;