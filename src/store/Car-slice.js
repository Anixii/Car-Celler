import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
const CarRef = collection(db, 'Cars')
const ModelRef = collection(db, 'Models')
const initialState = { 
    cars: []
}
export const getAllCars = createAsyncThunk( 
    'car/getAll', 
    async(_,{dispatch}) =>{
        try {
        const allRef = doc(CarRef, 'all') 
        const carSnap = await getDoc(allRef)
        dispatch(setCar({cars: carSnap.data().car}))
        } catch (error) {
            console.log(error);
        }
    }
)

const carSlice = createSlice({ 
    name: 'car',
    initialState, 
    reducers:{ 
        setCar(state,action){ 
            state.cars = action.payload.cars
        }
    }
}) 
export const {setCar} = carSlice.actions 
export default carSlice.reducer