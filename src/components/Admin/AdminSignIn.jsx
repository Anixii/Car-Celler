import React, {useState} from 'react'
import { useForm } from 'react-hook-form'
import s from './Admin.module.css'
import { useDispatch } from 'react-redux'
import { Spin } from 'antd'
import { useNavigate } from 'react-router-dom'
import { signUserInAccount } from '../../store/adminSlice'
const AdminPage = () => {
  const {register,formState:{errors}, handleSubmit} = useForm()
  const dispatch = useDispatch() 
  const [isFetch, setFetch] = useState(false)  
  const nav = useNavigate() 

  const onSubmit = async(e) =>{   
    setFetch(true)
    const {email,password} = e
    const res = await dispatch(signUserInAccount({email,password})) 
    setFetch(false)  
    if(res.payload !== 'error'){ 
      return nav('/admin')
    }
  }
  return (
    
    <>  
      <div className={s.admin__form}> 
        <div className={s.admin__form_container}>   
          <div className={s.form__text}>Войдите в аккаунт</div>
          <Spin spinning={isFetch}>
          <form className={s.form} onSubmit={handleSubmit(onSubmit)}> 
            <div className={s.form__item}> 
              <div className={s.form__title}>Email</div> 
              <div className={s.form__input}> 
              <input {...register('email', { 
                required: 'Это поле обязательное!'
              })} type="email" /> 
              </div>
              {errors.email && <span className={s.error__message}>{errors.email.message}</span>}
            </div>
            <div className={s.form__item}> 
              <div className={s.form__title}>Пароль</div>
              <div className={s.form__input}> 
                <input {...register('password', { 
                  required: 'Это поле обязательное!'
                })} type="password" /> 
                </div> 
              {errors.password && <span className={s.error__message}>{errors.password.message}</span>}
            </div> 
            <div className={s.form__btn}> 
                <button>Войти</button>
            </div>
          </form> 
          </Spin>

        </div>
      </div>
    </>
  )
}

export default AdminPage