import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Router from './Routes/Router'
import { UserDataProvider } from './Context/UserContext'
import { PostDataProvider } from './Context/PostContext'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <>
      <UserDataProvider>
        <PostDataProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/*' element={<Router />} />
            </Routes>
          </BrowserRouter>
        </PostDataProvider>
      </UserDataProvider>
      <ToastContainer/>
    </>
  )
}

export default App