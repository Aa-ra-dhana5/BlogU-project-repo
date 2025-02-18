//this to provide mechanism of protection to routs and pages
//it is protector container decides showing props

import React,{useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'


export default function Protected({children, authentication = true}){

    const navigate = useNavigate ()
    const [loader, setLoader] = useState(true)
    const authStatus =useSelector(state => status.auth.status)

    useEffect(() => {

        if(authentication && authStatus !== authentication){
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){
           navigate("/")
        }
         setLoader(false)
    }, [authStatus, navigate, authentication])
    return loader? <h1>Loading..</h1> : <>{children}</>
}
