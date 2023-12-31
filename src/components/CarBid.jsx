import React, { useState, } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import s from './Main.module.css'
import Select from 'react-select';
import { Button, Spin, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { setClientData } from '../store/Car-slice';
const CarBid = ({ setToggle }) => {
    const dispatch = useDispatch() 
    const [messageApi, contextHolder] = message.useMessage(); 
    const { defineModel } = useSelector(state => state.car)
    const [definePrice, setDefinePrice] = useState(defineModel?.equipment[0].price)
    const [equipment, setEquipment] = useState() 
    const [isFetching, setFetch] = useState(false)
    const typeSelect = defineModel?.equipment?.map((item) => ({
        value: item?.id,
        label: item?.name,
    }))
    const onHandleSelectChange = (e) => {
        const model = defineModel.equipment.filter(item => item.id === e.value)
        setDefinePrice(model[0].price)
        setEquipment(e.label)
    }
    const onHandleClickBack = () => {
        setToggle(false)
    } 
    const onHandleClick = async() =>{  
        setFetch(true)
        const res = await dispatch(setClientData({equipment})) 
        if(res === 'error'){ 
            messageApi.open({
                type: 'error',
                content: 'Произошла ошибка, попробуйте в другой раз!', 
                duration: 6
            });
        } else { 
            messageApi.open({
                type: 'success',
                content: 'Вы успешно оставили заявку!', 
                duration: 6
            });
        } 
        setFetch(false)
    }
    return (
        <> 
         {contextHolder}  
            <div className={s.bid} >
                <div className={s.bid__equipment}>
                    <div className={s.bid__title}>{defineModel.name} {defineModel.model}</div>
                    <div className={s.bid__select}>
                        <div className={s.bid__select_title}>Выберите комплектацию</div>
                        <div className={s.bid__item}>
                            <Select onChange={onHandleSelectChange} className={s.carSelect} options={typeSelect} isSearchable={true} placeholder={'Комплектация'} />
                            {!equipment && <span className={s.error__message}>Это поле обязательное!</span>}
                        </div>
                    </div>
                    <div className={s.bid__price}>

                            {definePrice?.map((item, index) => <div key={index} className={s.bid__list}>
                                <div className={s.bid__list_name}>{item.name}</div>
                                <div className={s.bid__list_price}>$ {item.num}</div>
                            </div>)}

                    </div>
                    <div className={s.bid__subtitle}>
                        <strong>Что входит в стоимость: </strong>
                        налог на автомобиль в Китае, затраты на оформление (страхование, постановка авто на учёт и снятие, экспортная декларация), внутренняя логистика автомобиля по Китаю + логистика до Хоргоса, Алматы или Бишкека. Растаможивание — не включено. Варианты растаможивания — по запросу.
                    </div>
                </div>

                <div className={s.bid__button}>
                    <div className={s.bid__button_container}>
                        <Spin spinning={isFetching}><div className={s.bid__btn}>
                            <Button className={s.btn__back} onClick={onHandleClickBack} icon={<ArrowLeftOutlined />} />
                            <button onClick={onHandleClick} className={s.btn__key}>Оставить заявку</button>
                        </div></Spin>
                        <div className={s.button__title}>
                            Сможете сравнить цены по комплектациям автомобиля и разным условиям поставки
                        </div>
                    </div>
                </div>



            </div>
        </>
    )
}
export default CarBid