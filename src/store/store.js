import { configureStore } from "@reduxjs/toolkit"
import CarSlice from "./Car-slice"
import adminSlice from "./adminSlice"

const store = configureStore( { 
    reducer:{ 
        car: CarSlice, 
        admin: adminSlice
    }
}
) 
window.store = store
export default store