import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCars } from '../store/Car-slice';
import Select from 'react-select';
import { Controller, useForm } from 'react-hook-form';

function CarSelect() {
    const dispatch = useDispatch()
    const [isDisabled, setDisabled] = useState(true)
    const [model, setModel] = useState([])
    const { cars } = useSelector(state => state.car)
    const typeSelect = cars?.map((item) => ({
        value: item?.title,
        label: item?.title,
    }))
    const { handleSubmit, formState: { errors }, reset, control } = useForm()
    const onHandleChange = (e) => { 
        reset({ 
            model: 'Модель'
        })
        const newModel = cars.filter(item => item.title === e.value)
        setDisabled(false)
        
        const typeSelect = newModel[0]?.models?.map((item) => ({
            value: item?.id,
            label: item?.name,
        }))
        setModel(typeSelect)
    }
    const onModelChange = (e) => {

    }
    useEffect(() => {
        dispatch(getAllCars())
    }, [dispatch]) 
    const onSubmit = (e) => {  
        console.log(e);
    }
    return (
        <> 
        <form onSubmit={handleSubmit(onSubmit)}> 

            <Controller
                name='mark' 
                control={control} 
                rules={{ 
                    required: "Это поле обязательное!",
                }}  
                
                render={({field}) => <Select {...field} options={typeSelect}  isSearchable={true} placeholder='Марка'  onChange={onHandleChange}   />}
                
                />
            <Controller
                name='model' 
                control={control} 
                rules={{ 
                    required: "Это поле обязательное!",
                }}   
                onChange={onModelChange}
                render={({field}) => <Select {...field} options={model}  placeholder={'Модель'}  isDisabled={isDisabled}   />
            }
            
            /> 
            <button>CLick</button>
            </form>
        </>
    )
}

export default CarSelect