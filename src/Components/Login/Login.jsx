import React, { useContext } from 'react'
import "./login.css"
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from "yup"
import UserContext from '../../Context/UserContext'
import { toast } from 'react-toastify'

function Login() {
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)
  const formik = useFormik({
    initialValues: { email: "", password: "", },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "not valid email")
        .required("email is required"),
      password: Yup.string()
        .min(8, "password should contain atleast 8")
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "password should contain one")
        .required("please secure your account with the password"),
    }),
    onSubmit: (values) => {
      const users = JSON.parse(localStorage.getItem("users"))

      if (users) {
        const user = users.find((user) => user.email === values.email)
      
      if (user) {
        if (user.password === values.password) {
          setUser(user)
          localStorage.setItem("blogger",JSON.stringify(user))
          toast.success("successfully loggedin")
          navigate("/")
        } else {
          toast.error('incorrect password', { position: 'top-center' })
        }

      } else {
        toast.error('user not found please sign up', { position: 'top-center' })
      }

    }
    else{
      toast.error('user not found please sign up', { position: 'top-center' })
    }
  }})
  return (
    <>
      <div className='login-wrapper-1'>

        <div className='login-wrapper'>
          <form onSubmit={formik.handleSubmit}>       <h2>LOGIN</h2>
            <div className=''>
              <label>Email</label>
              <input className='input' name='email' onChange={formik.handleChange} value={formik.values.email} />
              <p>{formik.errors.email}</p>
            </div>
            <div className=''>
              <label>Password</label>
              <input className='input' type='password' name='password' onChange={formik.handleChange} value={formik.values.password} />
              <p>{formik.errors.password}</p>
            </div>
            <div><button type='submit'> LOGIN</button></div>
            <div> Do You Want To Create An Account? <Link to="/signup">Signup</Link>
            </div></form>


        </div>
      </div>

    </>
  )
}

export default Login