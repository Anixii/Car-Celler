import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCars, getDefineCarImage } from '../store/Car-slice';
import s from './Main.module.css'
import CarCalculation from './CarCalculation';
function CarSelect() {
    const dispatch = useDispatch()
    const { cars, carImage } = useSelector(state => state.car) 
    const [isToggled, setToggle] = useState(false)
    useEffect(() => {
        dispatch(getAllCars())
    }, [dispatch])
   
    return (
        <>
            <div className={s.choose}>
                <div className={s.img}>
                    <img src={carImage} alt="Car" />
                </div> 
                {isToggled ? 
                <div></div> 
                :<CarCalculation cars={cars} setToggle={setToggle}/>
                }
            </div>

        </>
    )
}

export default CarSelect