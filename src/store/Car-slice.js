import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, getDoc } from "firebase/firestore";
import { db, storage } from "../firebaseConfig"; 
import carImg from '../assets/img/main.jpg'
import { getDownloadURL, listAll, ref } from "firebase/storage";
const CarRef = collection(db, 'Cars')
// const ModelRef = collection(db, 'Models')
const initialState = { 
    cars: [], 
    carImage: carImg, 
    mark: null, 
    model:null, 
    phoneNumber: null, 
    city: null
}
export const getAllCars = createAsyncThunk( 
    'car/getAll', 
    async(_,{dispatch}) =>{
        try {
        const allRef = doc(CarRef, 'all') 
        const carSnap = await getDoc(allRef) 
        console.log(carSnap.data());
        dispatch(setCar({cars: carSnap.data()?.cars}))
        } catch (error) {
            console.log(error);
        }
    }
)
export const getDefineCarImage = createAsyncThunk( 
    'car/getCarImg', 
    async({id},{dispatch}) =>{ 
        try {
            const collectionRef = ref(storage, id)
            const files = await listAll(collectionRef)
            const fileURLs = await Promise.all(
                files.items.map(async (fileRef) => {
                    const downloadURL = await getDownloadURL(fileRef)
                    return downloadURL
                  })
                )  
            console.log(fileURLs);
            dispatch(setCarImgage({img: fileURLs[0]}))
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
        }, 
        setCarImgage(state, action) { 
            state.carImage = action.payload.img
        }, 
        setCarFormInfo(state, action){ 
            state.city = action.payload.city 
            state.phoneNumber = action.payload.phoneNumber 
            state.mark = action.payload.mark
            state.model = action.payload.model
        } 
        
    }
}) 
export const {setCar,setCarImgage, setCarFormInfo} = carSlice.actions 
export default carSlice.reducer