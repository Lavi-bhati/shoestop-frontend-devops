
import React, { useContext, useState } from 'react'
import '../signup/signup.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { productContext } from '../contextAPI/Context'

const Login = () => {

    const navigate = useNavigate()

    const { setToken } = useContext(productContext)

    const [email, setMail] = useState('')
    const [password, setPassword] = useState('')

    const url = "http://localhost:5000/login"

    // Handle email input
    const changeMailHandler = (e) => {
        setMail(e.target.value)
    }

    // Handle password input
    const changePasswordHandler = (e) => {
        setPassword(e.target.value)
    }

    // Handle login
    const submitHandler = async () => {

        if (!email || !password) {
            alert("Please enter email and password")
            return
        }

        try {

            const response = await axios.post(url, {
                email,
                password
            })

            if (response.data.token) {

                // Store token
                localStorage.setItem('token', response.data.token)

                // Update context
                setToken(response.data.token)

                alert("Login successful!")

                // Navigate to home
                navigate('/home')

            } else {

                alert("Login failed: Token not received")

            }

        } catch (error) {

            console.error(
                "Login Error:",
                error.response?.data || error.message
            )

            alert(
                error.response?.data?.message ||
                "Login failed. Please check your credentials."
            )

        }
    }

    return (

        <div className='signup'>

            <input
                type="email"
                placeholder='email'
                value={email}
                onChange={changeMailHandler}
            />

            <input
                type="password"
                placeholder='password'
                value={password}
                onChange={changePasswordHandler}
            />

            <button onClick={submitHandler}>
                Login
            </button>

        </div>

    )
}

export default Login
