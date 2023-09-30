import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { arrayUnion, collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebaseConfig"; 
import carImg from '../assets/img/main.jpg'
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { generateRandomString } from "../helpers/random";
const CarRef = collection(db, 'Cars')
const ModelRef = collection(db, 'Models') 
const UserRef = collection(db, 'Users')
const initialState = { 
    email: null
} 
export const setNewCarMark = createAsyncThunk( 
    'admin/setNewCarMark', 
    async({file, name}) =>{ 
        try { 
            const carSnap = doc(CarRef,'all')
            const id = generateRandomString()
            const photomouseRef = ref(storage, id)
            const fileRef = ref(photomouseRef, file.name)
            await uploadBytes(fileRef, file.originFileObj)
            await updateDoc(carSnap, {
                cars: arrayUnion({  })
              }) 

        } catch (error) {
            
        }
    }
)
const adminSlice = createSlice({ 
    name: 'admin',
    initialState, 
    reducers:{ 
        
    }
}) 
export const {} = adminSlice.actions 
export default adminSlice.reducer