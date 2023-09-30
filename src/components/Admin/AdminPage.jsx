import React from 'react'
import s from './Admin.module.css'
import { Link } from 'react-router-dom'
const AdminPage = () => {
  return (
    <> 
        <div className={s.admin}>
            <div className={s.admin__container}>
                <Link to={'/admin/mark'}>Добавить новую Марку машины</Link>
                <Link to={'/admin/model'}>Добавить новую Модель машины</Link>
            </div>
        </div>
    </>
  )
}

export default AdminPage