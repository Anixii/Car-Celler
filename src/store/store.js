import { configureStore } from "@reduxjs/toolkit"
import CarSlice from "./Car-slice"

const store = configureStore( { 
    reducer:{ 
        car: CarSlice
    }
}
)
export default store