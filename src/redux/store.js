import { configureStore } from "@reduxjs/toolkit";
import   userData  from "./userdata";

export const store=configureStore({
    reducer:{
data:userData,
    }
})