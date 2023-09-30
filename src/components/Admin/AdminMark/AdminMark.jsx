import React from 'react'
import s from '../Admin.module.css'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
const AdminMark = () => {
  const onSubmit = (data) => {
    console.log(data);
  }
  const { handleSubmit, formState: { errors }, control, register, reset } = useForm({
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'model',
  });
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={s.mark}>
        <div className={s.mark__container}>
          <div className={s.mark__item}>
            <div className={s.mark__item__title}>Название:</div>
            <input type="text"  {...register('title', { required: 'Это поле обязательное!' })} />
            {errors.title && <span className={s.error__message}>{errors.title.message}</span>}
          </div>
          <div className={s.mark__item}>
            <div className={s.mark__item__title}>Фото</div>
            <input type="file"  {...register('file', { required: 'Это поле обязательное!' })} />
            {errors.file && <span className={s.error__message}>{errors.file.message}</span>}
          </div>
          <div className={s.mark__item}>
            <div className={s.mark__item__title}>Добавить модель авто</div>
            <input type="model"  {...register('model', { required: 'Это поле обязательное!' })} />
            {errors.model && <span className={s.error__message}>{errors.model.message}</span>}
          </div>
          <div className={s.mark__item}>

            {fields?.map((field, index) => (
              <div
                key={field.id}
                className={s.field}>
                <div
                  className={s.admin__form_item}
                >
                  <Controller
                    name={`model[${index}]`}
                    control={control}
                    defaultValue={field.ads}
                    rules={{
                      required: 'Это поле обязательное!'
                    }}
                    render={({ field }) => <input className={s.field__input} {...field} />}
                  />
                  <Button icon={<DeleteOutlined />} className={s.form__delete} onClick={() => remove(index)}></Button>
                </div>
                {errors?.model?.[index] && <span className={s.error__message}>{errors?.model?.[index]?.message}</span>}
              </div>
            ))}
            <button className={s.admin__add_field} onClick={() => append('')}>
              Добавить поле
            </button>

          </div>
          <div className={s.mark__submit}>
            <button>Добавить</button>
          </div>
        </div>
      </form>
    </>
  )
}


export default AdminMark