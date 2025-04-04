import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const useAuthStatus = () => {
  
    const {Users} = useSelector(state => state.Auth)

    const [loggedIn , setLoggedIn] = useState(false)
    const [chechStatus , setChechStatus] = useState(true)

    useEffect(() => {
        Users ? setLoggedIn(true) : setLoggedIn(false)
        setChechStatus(false)
    },[Users]);

    return {loggedIn , chechStatus}

}

export default useAuthStatus
