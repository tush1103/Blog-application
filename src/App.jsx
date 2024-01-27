/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import './App.css'
import authService from './appwrite/auth'
import { useDispatch } from 'react-redux'
import { login, logout } from './store/authSlice'
import Header from './components/Header/HEADER.JSX'
import Footer from './components/Footer/Footer'

function App () {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService
      .getCurrentUSer()
      .then(userData => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(setLoading(false))
  }, [dispatch])
  return !loading ? <div className='min-h-screen flex flex-wrap context-between bg-gray-400'>
    <div className='w-full block'>
      <Header/>
      <main>
        {/* <Outlet/> */}
      </main>
      <Footer/>
    </div>
  </div> : null
}

export default App
