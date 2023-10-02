import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const WithAdminAuth = ({children}) => {
    const {email} = useSelector(state => state.admin)
    if(!email){ 
        return <Navigate to={'/admin/sign'}/>
    }
    return children
}

export default WithAdminAuth