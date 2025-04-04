import React from 'react'
import useAuthStatus from '../Hooks/useAuthStatus'
import Loading from './Loading'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {

    const {loggedIn , chechStatus} = useAuthStatus()
    if(chechStatus){
        return <Loading />
    }

    return loggedIn ? <Outlet /> : <Navigate to={"/login"} />
    
}

export default PrivateRoute
