import s from '../Admin.module.css'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setNewCarMark } from '../../../store/adminSlice';
import { Spin, message } from 'antd';

function AdminPanel() {
  const { handleSubmit,register, reset, formState: { errors } } = useForm();
  const [complectations, setComplectations] = useState([{ name: '', price: [{ num: '', name: '' }] }]);
  const [isButtonFetch, setButtonFetch] = useState(false)
  const dispatch = useDispatch() 
  const [messageApi, contextHolder] = message.useMessage(); 
  const onSubmit = async(data) => {
    const { title, model, file, complectations } = data
    reset()
    const res = await dispatch(setNewCarMark({ FC: setButtonFetch,file: file[0], complectation: complectations, model, title }))
    if(res === 'error'){ 
      messageApi.open({
          type: 'error',
          content: 'Произошла ошибка, попробуйте в другой раз!', 
          duration: 6
      });
  } else { 
      messageApi.open({
          type: 'success',
          content: 'Вы успешно загрузили данные!', 
          duration: 6
      });
  } 
  };

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

  return (
    <div className={s.mark}> 
    {contextHolder}
      <form className={s.mark__container} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.mark__title}>Добавление новоый марки машины</div>
        <div className={s.mark__item}>
          <div className={s.mark__item__title}>Название марки</div>
          <input {...register('title', { required: 'Это поле обязательное!' })} />
          {errors.title && <span className={s.error__message}>{errors.title.message}</span>}

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
        <Spin spinning={isButtonFetch}> 
        <button className={s.submit_btn} type="submit">Сохранить</button>
        </Spin>
      </form>
    </div>
  );
}

export default AdminPanel;
