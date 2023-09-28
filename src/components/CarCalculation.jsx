import React, {useState} from 'react'
import { Controller, useForm } from 'react-hook-form';
import s from './Main.module.css' 
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { getDefineCarImage, getDefineCarModel, setCarFormInfo } from '../store/Car-slice';
import { Spin } from 'antd';
const CarCalculation = ({cars, setToggle, setImgFetching, isSelectFetching}) => {  
    const dispatch = useDispatch()
    const { handleSubmit, formState: { errors }, reset, control, register,  } = useForm() 
    const [mark, setMark] = useState()
    const onSubmit = (e) => {
        const {phoneNumber, model,city} = e  
        dispatch(setCarFormInfo({mark:mark,model:model.label,phoneNumber,city})) 
        setToggle(true)
    } 
    const [isDisabled, setDisabled] = useState(true)
    const [model, setModel] = useState([])
    const typeSelect = cars?.map((item) => ({
        value: item?.title,
        label: item?.title,
    }))
    const onHandleChange = (e) => {
        const newModel = cars.filter(item => item.title === e.value)
        setMark(e.label)
        setDisabled(false)

        const typeSelect = newModel[0]?.models?.map((item) => ({
            value: item?.id,
            label: item?.name,
        }))
        setModel(typeSelect)
        reset({
            model: 'Модель',
        })
    }
    const onModelChange = (e) => {
        dispatch(getDefineCarModel({id:e.value}))
        dispatch(getDefineCarImage({ id: e.value, FC:setImgFetching }))
    }
  return (
    <>  
    <form className={s.car__form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={s.car__container}>
                        <div className={s.car__title}>Выберите марку или модель</div>
                        <div className={s.car__subtitle}>Покажем цену с завода в Китае, по прямому дилерскому контракту и текущему курсу</div>
                        <div className={s.car__currency}>1 CNY = 0.1366 USD</div>

                        <div className={s.car__select}>

                            <div className={s.car__item}>
                                <Spin spinning={isSelectFetching}> 
                                <Controller
                                    name='mark'
                                    control={control}
                                    rules={{
                                        required: !model,
                                    }}

                                    render={({ field }) => <Select {...field}
                                        onChange={onHandleChange} className={s.carSelect} options={typeSelect} isSearchable={true} placeholder='Марка' />}
                                /> </Spin>
                            </div>

                            <div className={s.car__item}>

                                <Controller
                                    name='model'
                                    control={control}
                                    rules={{
                                        required: "Это поле обязательное!",
                                    }}

                                    render={({ field }) => <Select  {...field} onChange={(selectedOption) => {
                                        field.onChange(selectedOption); // Передаем значение в поле формы
                                        onModelChange(selectedOption); // Вызываем вашу функцию
                                    }} className={s.carSelect} options={model} placeholder={'Модель'} isDisabled={isDisabled} />}
                                />
                            </div>
                        </div>
                                {(errors.model || errors.mark) && <span className={s.error__message}>Это поле обязательное!</span>}
                    </div>

                    <div className={s.car__contacts}>
                        <div className={s.contact__title}>Для расчёта условий поставки укажите куда доставить автомобиль</div>
                        <div className={s.contact__input}>
                            <div className={s.input__label}>Город получения автомобиля</div>
                            <input type="text" {...register('city', { required: "Это поле обязательное!" })} />
                            {errors.city && <span className={s.error__message}>{errors.city.message}</span>}
                        </div>
                        <div className={s.contact__input}>
                            <div className={s.input__label}>Ваш номер</div>
                            <input type="number" {...register('phoneNumber', { required: "Это поле обязательное!" })} />
                        </div>
                        {errors.phoneNumber && <span className={s.error__message}>{errors.phoneNumber.message}</span>}
                    </div>
                    <div className={s.car__button}> 
                    <div className={s.car__button_container}>
                        <div className={s.car__btn}>
                            <button>Быстрый расчёт под ключ</button>
                        </div>
                        <div className={s.button__title}>
                            Сможете сравнить цены по комплектациям автомобиля и разным условиям поставки
                        </div>
                    </div>
                    </div>
                </form>
    </>
  )
}

export default CarCalculation