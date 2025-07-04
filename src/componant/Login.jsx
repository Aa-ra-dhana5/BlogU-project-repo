import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Button, Input, Logo} from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import {useForm} from 'react-hook-form'
//react-hook-form use

function Login() {
  const navigate = useNavigate()
  const dispatch =useDispatch()

  //why handlesubmit and login both? cuz handlesubmit is method that is used by rect-hook-form which is to fetch data directly and login is used to handle that data and push it 
  const {register, handleSubmit} =useForm()
  const [error, setError] =useState("")

  const login =async (data) => {
    // why seterror empty ? cuz for evrynew submission error must be empty out
    setError("")
    try {
      const session = await authService.login(data)
    
      //now check if session is there means user login else not 
      if(session){
        //why await ?? cuz data fetching by gtCurrentUser and its async function also fetch data after user login 
        const userData = await authService.getCurrentUser()
        if(userData) dispatch(authLogin(userData))
        navigate("/")
      }
    } catch (error) {
       setError(error.message)
    }
  }
  return (
    <div
    className='flex items-center justify-center w-full'>
      <div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10'>
      <div className='mb-2 flex justify-center'>
          <span className='inline-block w-full max-w-[100px]'>
            <Logo width='100%'/>
            
          </span>
      </div>
      <h2 className='text-center text-2xl font-bold leading-tight'>Sign in to your account</h2>
      <p className='mt-2 text-center text-base text-black/60'>
      Don&apos;t have any account?&nbsp;
      <Link
        to='/signup'
        className='font-medium text-primary transition-all duration-200 hover:underline'
      >signup</Link>
      </p>

      {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
      
      {/**handlesubmit is a keyword and an event which called to take values from register and we do not need to manage that state of value */}
      <form onSubmit={handleSubmit(login)} 
      className='mt-8'>
        <div className='space-y-5'>
          {/**here you spread register why?? cuz while you take another input it will overwrite then value  */}
         <Input lable="Email:  " placeholder="Enter your emial" type="email" {...register("emial", {
          required: true,
          
          validate: {
            matchPatern: (value) => /^\w+([.-]?\w+) *@\w+([.-?]\w+)*(\.\w{2,3})+$/.test(value)||
                                     "Email address must be a valid address",
          } // this validation feild is to check which kind of patter you want to check here the patter is writte between / / and .test(value) will compare your value with that pattern 
         })}/>

         <Input lable="Password: " type="password" placeholder="Enter your password" {...register("password", {required: true})} />
         <Button
         type="submit"
         className=" w-full"
         >Sign in </Button>
        </div>
      </form>
      </div>
      
    </div>
  )
}

export default Login
