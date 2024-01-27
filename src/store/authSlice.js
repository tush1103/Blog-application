/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

//we have made this slice to check whether the user is authenticated or not
const initialState={
    status:false,
    userData:null
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.status=true //now this user is authenticated
            state.userData=action.payload.userData
        },
        logout:(state,action)=>{
            state.status=false;
            state.userData=null;
        }
    }
})

export default authSlice.reducer
export const {login,logout} =authSlice.actions