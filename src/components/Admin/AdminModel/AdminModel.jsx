import s from '../Admin.module.css'
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setNewCarModel } from '../../../store/adminSlice';
import Select from 'react-select'
import { getAllCars } from '../../../store/Car-slice';
import { Spin } from 'antd';
function AdminPanel() {
  const { handleSubmit, control, register, reset, formState: { errors } } = useForm();
  const [complectations, setComplectations] = useState([{ name: '', price: [{ num: '', name: '' }] }]);
  const { cars} = useSelector( state => state.car) 
  const [isFetch, setFetching] = useState(false)
  const dispatch = useDispatch()
  const onSubmit = (data) => { 
    dispatch(setNewCarModel({title: data.mark.label, model: data.model, complectations: data.complectations,file:data.file[0]}))
    reset()
  }; 
  useEffect(() =>{ 
    dispatch(getAllCars({FC:setFetching}))
  },[dispatch])
  const addComplectation = () => {
    // Добавьте новую комплектацию в состояние
    setComplectations([...complectations, { name: '', price: [{ num: '', name: '' }] }]);
  };

  const removeComplectation = (index) => {
    // Удалите комплектацию из состояния
    const updatedComplectations = [...complectations];
    updatedComplectations.splice(index, 1);
    setComplectations(updatedComplectations);
  };

  const addPrice = (complectationIndex) => {
    // Добавьте новую цену и место продажи для комплектации
    const updatedComplectations = [...complectations];
    updatedComplectations[complectationIndex].price.push({ num: '', name: '' });
    setComplectations(updatedComplectations);
  };

  const removePrice = (complectationIndex, priceIndex) => {
    // Удалите цену и место продажи для комплектации
    const updatedComplectations = [...complectations];
    updatedComplectations[complectationIndex].price.splice(priceIndex, 1);
    setComplectations(updatedComplectations);
  };
  const typeSelect = cars?.map((item) => ({
    value: item?.title,
    label: item?.title,
})) 

  return ( 
    <div className={s.mark}>
      <form className={s.mark__container} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.mark__title}>Добавление новоый модели машины</div>
        <div className={s.mark__item}>
          <div className={s.mark__item__title}>Выберите марку машины, для которой хотите добавить новую модель</div>
          <Spin spinning={isFetch}> 
          <Controller
            name='mark'
            control={control}
            rules={{
              required: 'Это поле обязательное!',
            }}
            
            render={({ field }) => <Select {...field} className={s.carSelect} options={typeSelect} isSearchable={true} placeholder='Марка' />}
            />
            </Spin> 
            {errors.mark && <span className={s.error__message}>{errors.mark.message}</span>}
        </div>
        <div className={s.mark__item}>
          <div className={s.mark__item__title}>Название модели </div>
          <input {...register('model', { required: 'Это поле обязательное!' })} />
          {errors.model && <span className={s.error__message}>{errors.model.message}</span>}
        </div> 
        <div className={s.mark__item}>
          <div className={s.mark__item__title}>Фото</div>
          <input type="file"  {...register('file', { required: 'Это поле обязательное!' })} />
          {errors.file && <span className={s.error__message}>{errors.file.message}</span>}
        </div>
        <div className={s.mark__equipment}>
          <div className={s.mark__equipment_title}>Комплектации:</div>

          <div>
            {complectations.map((complectation, complectationIndex) => (
              <div className={s.equipment__item} key={complectationIndex}>
                <div className={s.equipment__item__title}>Комплектация №{complectationIndex + 1}</div>
                <div className={s.mark__item}>
                  <div className={s.mark__item__title}>Название комплектации:</div>
                  <input {...register(`complectations[${complectationIndex}].name`, { required: true })} />
                  {errors.complectations?.[complectationIndex]?.name && <span className={s.error__message}>Это поле обязательное!</span>}
                </div>

                <div className={s.mark__equipment_subtitle}>Цены и места продажи:</div>

                <div>


                  {complectation.price.map((price, priceIndex) => (
                    <div key={priceIndex}>
                      <div className={s.equipment__item__title}>Цена №{priceIndex + 1}</div>
                      <div className={s.mark__item}>
                        <div className={s.mark__item__title}>Цена:</div>
                        <input type='number' {...register(`complectations[${complectationIndex}].price[${priceIndex}].num`, { required: true })} />
                        {errors.complectations?.[complectationIndex]?.price?.[priceIndex]?.num && <span className={s.error__message}>Это поле обязательное!</span>}
                      </div>
                      <div className={s.mark__item}>
                        <div className={s.mark__item__title}>Место продажи:</div>
                        <input {...register(`complectations[${complectationIndex}].price[${priceIndex}].name`, { required: true })} />
                        {errors.complectations?.[complectationIndex]?.price?.[priceIndex]?.name && <span className={s.error__message}>Это поле обязательное!</span>}
                      </div>
                      {priceIndex !== 0 && <button className={s.price__btn_delete} type="button" onClick={() => removePrice(complectationIndex, priceIndex)}>
                        Удалить цену и место продажи №{priceIndex + 1}
                      </button>}
                    </div>
                  ))}


                </div>
                <div className={s.buttons}>
                  <button type="button" className={s.price__btn} onClick={() => addPrice(complectationIndex)}>
                    Добавить цену и место продажи
                  </button>
                  {complectationIndex !== 0 && <button className={s.equipment__btn_delete} type="button" onClick={() => removeComplectation(complectationIndex)}>
                    Удалить комплектацию № {complectationIndex + 1}
                  </button>}
                </div>
              </div>
            ))}


          </div>
        </div>
        <button className={s.equipment__btn} type="button" onClick={addComplectation}>
          Добавить новую комплектацию
        </button>
        <button className={s.submit_btn} type="submit">Сохранить</button>
      </form>
    </div>
  );
}

export default AdminPanel;