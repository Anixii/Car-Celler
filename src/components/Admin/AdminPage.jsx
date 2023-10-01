import React from 'react'
import s from './Admin.module.css'
import { Link } from 'react-router-dom'
const AdminPage = () => {
  return (
    <> 
        <div className={s.admin}>
                <Link to={'/admin/mark'}>Добавить новую Марку машины</Link>
                <Link to={'/admin/model'}>Добавить новую Модель машины</Link>
        </div>
    </>
  )
}

export default AdminPage