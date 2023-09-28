import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCars} from '../store/Car-slice';
import s from './Main.module.css'
import CarCalculation from './CarCalculation';
import CarBid from './CarBid';
import { Skeleton, Spin } from 'antd';
function CarSelect() {
    const dispatch = useDispatch()
    const { cars, carImage } = useSelector(state => state.car) 
    const [isToggled, setToggle] = useState(false) 
    const [isImgFetching, setImgFetching] = useState(false)
    const [isSelectFetching, setSelectFetch] = useState(false)
    useEffect(() => {
        dispatch(getAllCars({FC:setSelectFetch}))
    }, [dispatch])
   
    return (
        <>
            <div className={s.choose}> 
                <div className={s.img}>   
                <img src={carImage} alt="Car" /> 
                </div>  
                {isToggled ? 
                <CarBid setToggle={setToggle}/>
                :<CarCalculation cars={cars} isSelectFetching={isSelectFetching} setImgFetching={setImgFetching} setToggle={setToggle}/>
                }
            </div>

        </>
    )
}

export default CarSelect