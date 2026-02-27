import { createSlice } from "@reduxjs/toolkit";

const paginationSlice = createSlice({
    name: "paginationSlice",
    initialState:{
        page: 1,
    },
    reducers:{
        next:(state) => {
            state.page+=1;
        },
        prev:(state) => {
            state.page-=1;
        }
    }
});

export default paginationSlice;