import {useDispatch} from 'react-redux'
import { useEffect, useState } from 'react'
import './App.css'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Footer, Header } from './componant'
// import { Outlet } from 'react-router-dom'

function App() {
   
  //loading state cuz when we neet to fetch data from network and it takes time... to do conditional rendering using it else
   const [loading , setLoding] = useState (true)

   //this to get values from databse like go and take value of user
   const dispatch = useDispatch()
  
   //check that whether user in login or not
   useEffect ( () => {
    authService.getCurrentUser()
    .then( (userData)=> {
      if(userData) {
        dispatch(login({userData}))
      } else {
        dispatch (logout())
      }
    })
    //finally runs in evryconditon somethimes catch run or not so we used finally
    .finally( () => setLoding)
   }, [])

   return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        TODO:  {/*<Outlet />*/}
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}
  
export default App
