import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from "yup"
import "./Signup.css"
import { useContext } from 'react'
import UserContext from '../../Context/UserContext'
import { toast } from 'react-toastify'
import {v4 as idGenerator} from "uuid";

function Signup() {
    const navigate = useNavigate()
    const { setUser } = useContext(UserContext)
    const formik = useFormik({
        initialValues: { username: "", email: "", password: "", confirmPassword: "", },
        validationSchema: Yup.object({
            username: Yup.string()
                .min(3, "username should contain atleast 3 characters")
                .max(25, "username is too long")
                .required("username is required"),
            email: Yup.string()
                .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "not valid email")
                .required("email is required"),
            password: Yup.string()
                .min(8, "password should contain atleast 8")
                .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "password should contain one")
                .required("please secure your account with the password"),
            confirmPassword: Yup.string().oneOf([Yup.ref("password")])
                .required("please confirm your password")


        }),
        onSubmit: async (values) => {
            const users = JSON.parse(localStorage.getItem("users"))
            if (!users) {
                localStorage.setItem("users", JSON.stringify([{id:idGenerator(),...values}]));
                setUser(values)
                toast.success("Successfully signed up")
                navigate('/')

            } else {
                const userWithEmail = users.findIndex(user => user.email === values.email)
                if (userWithEmail === -1) {
                    localStorage.setItem("user", JSON.stringify([...users,{id:idGenerator(),...values}]))
                    setUser(values);
                    toast.success("successfully signed up")
                    navigate('/')
                }
                else {
                    toast.error("Email already taken", { position: "top-center" })
                } 
            }
        },
    });
    return (
        <>
            <div className='wrapper-1'>
            <div className='signup-wrapper'><h1 >Signup</h1>
                <form onSubmit={formik.handleSubmit}>
                    <div className='input-wrapper'>
                        <div><div><label>Username</label></div>
                            <input className='input' type='text' name='username' onChange={formik.handleChange} value={formik.values.username} />
                            <p>{formik.errors.username}</p></div>

                        <div> <div><label>email</label></div>
                            <input className='input' name='email' onChange={formik.handleChange} value={formik.values.email} />
                            <p>{formik.errors.email}</p>
                        </div>
                        <div><div>
                            <label>Password</label></div>
                            <input className='input' type='password' name='password' onChange={formik.handleChange} value={formik.values.password} />
                            <p>{formik.errors.password}</p></div>


                        <div><div>
                            <label>ConfirmPassword</label></div>
                            <input className='input' type='password' name='confirmPassword' onChange={formik.handleChange} value={formik.values.confirmPassword} />
                            <p>{formik.errors.confirmPassword}</p>
                        </div></div>


                    <div className='button-div' ><button className='button-wrapper' type='submit'>signin</button></div>
                    <div className='footer'>do you already have an account?
                        <Link to="/login">Login</Link></div>

                </form></div>
                


            </div>

        </>

    )
}

export default Signup