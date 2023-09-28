import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, getDoc } from "firebase/firestore";
import { db, storage } from "../firebaseConfig"; 
import carImg from '../assets/img/main.jpg'
import { getDownloadURL, listAll, ref } from "firebase/storage";
const CarRef = collection(db, 'Cars')
const ModelRef = collection(db, 'Models')
const initialState = { 
    cars: [], 
    carImage: carImg, 
    mark: null, 
    model:null, 
    phoneNumber: null, 
    city: null, 
    defineModel: null
} 
export const getDefineCarModel = createAsyncThunk( 
    'car/getDefineCarModel',
    async ({id},{dispatch}) => { 
        try {
            const defineCarDoc = doc(ModelRef, id) 
            const defineSnap = await getDoc(defineCarDoc) 
            dispatch(setDefineModel({model: defineSnap.data()}))
        } catch (error) {
            console.log(error);
        }
    }
)
export const getAllCars = createAsyncThunk( 
    'car/getAll', 
    async({FC = ()=>{} },{dispatch}) =>{
       FC(true)
        try {
        const allRef = doc(CarRef, 'all') 
        const carSnap = await getDoc(allRef) 
        console.log(carSnap.data());
        dispatch(setCar({cars: carSnap.data()?.cars}))
        } catch (error) {
            console.log(error);
        }finally{ 
            FC(false)
        }
        FC(false)
    } 
) 
export const setClientData = createAsyncThunk( 
    'car/setClientData', 
    async () => { 
        try {
            
        } catch (error) {
            
        }
    }
)
export const getDefineCarImage = createAsyncThunk( 
    'car/getCarImg', 
    async({id, FC=() =>{}},{dispatch}) =>{ 
        FC(true)
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
        }finally{ 
            FC(false)
        } 
        FC(false)
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
        }, 
        setDefineModel(state,action){ 
            state.defineModel = action.payload.model 
        }
        
    }
}) 
export const {setCar,setCarImgage, setCarFormInfo, setDefineModel} = carSlice.actions 
export default carSlice.reducer