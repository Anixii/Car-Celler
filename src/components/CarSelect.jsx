import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCars} from '../store/Car-slice';
import s from './Main.module.css'
import CarCalculation from './CarCalculation';
import CarBid from './CarBid'; 
import { motion } from 'framer-motion';
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
            <motion.div whileInView={{y:0, opacity: 1, transitionDelay: 0.5}} initial={{y:0, opacity:0}} viewport={{once:true,amount:0.2}} className={s.choose}>  
                <div className={s.img}>   
                {/* <Spin>  */}
                <img className={s.car__image} src={carImage} alt="Car" />  
                {/* </Spin> */}
                </div>
                {isToggled ? 
                <CarBid setToggle={setToggle}/>
                :<CarCalculation cars={cars} isSelectFetching={isSelectFetching} setImgFetching={setImgFetching} setToggle={setToggle}/>
            }
            </motion.div>

        </>
    )
}

export default CarSelect