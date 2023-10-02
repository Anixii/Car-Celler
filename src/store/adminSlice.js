import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { arrayUnion, collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../firebaseConfig"; 
import carImg from '../assets/img/main.jpg' 
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { generateRandomString } from "../helpers/random";
const CarRef = collection(db, 'Cars')
const ModelRef = collection(db, 'Models') 
const UserRef = collection(db, 'Users')
const initialState = { 
    email: null
} 
export const signUserInAccount = createAsyncThunk( 
    'user/sign', 
    async ({email,password},{dispatch}) =>{ 
        try{ 
            const {user} = await signInWithEmailAndPassword(auth, email,password)  
            dispatch(setUser({email:user.email})) 
            return true
        }catch(error){  
            console.log(error);
            return 'error'
        }
    }
) 
export const setNewCarMark = createAsyncThunk( 
    'admin/setNewCarMark', 
    async({file, title, model,complectation,FC = () =>{}}) =>{  
        FC(true)
        try { 
            const carSnap = doc(CarRef,'all')
            const id = generateRandomString()
            const photomouseRef = ref(storage, id)
            const fileRef = ref(photomouseRef, file.name)
            await uploadBytes(fileRef, file)
            await updateDoc(carSnap, {
                cars: arrayUnion({ 
                    title, 
                    models:[
                        {id:id,name: model}
                    ]
                })
              })
            const modelDoc = doc(ModelRef, id) 
            await setDoc(modelDoc,{ 
                model, 
                name: title, 
                equipment:complectation, 
                id
            }) 
            FC(false) 
            return 'Вы успешно загрузили новую марку авто'
        } catch (error) {
            console.log(error);
            return 'error'
        }finally{ 
            FC(false)
        }
    }
)
export const setNewCarModel = createAsyncThunk( 
    'admin/setNewCarMark', 
    async({title, model,complectations,file,FC= () =>{}}) =>{  
        FC(true)
        try { 
            const carSnap = doc(CarRef,'all')
            const id = generateRandomString()
            const carData = await getDoc(carSnap) 
            const updatedArray = carData.data().cars.map((item) => {
                if (item.title === title) {
                  const updatedModels = [...item.models, {name: model, id}];
                  return { ...item, models: updatedModels };
                }
                return item;
              }); 
              const photomouseRef = ref(storage, id)
            const fileRef = ref(photomouseRef, file.name)
            await uploadBytes(fileRef, file)
            await updateDoc(carSnap, { cars: updatedArray })
            const modelDoc = doc(ModelRef, id) 
            await setDoc(modelDoc,{ 
                model, 
                name: title, 
                equipment:complectations, 
                id
            }) 
            FC(false) 
            return 'Вы успешно загрузили новую марку авто'
        } catch (error) {
            console.log(error); 
            return 'error'
        }finally{ 
            FC(false)
        }
    }
)
const adminSlice = createSlice({ 
    name: 'admin',
    initialState, 
    reducers:{ 
        setUser(state,action){ 
            state.email = action.payload.email
        }
    }
}) 
export const {setUser} = adminSlice.actions 
export default adminSlice.reducer