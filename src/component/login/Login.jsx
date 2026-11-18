
import React, { useContext, useState } from 'react'
import '../signup/signup.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { productContext } from '../contextAPI/Context'
import API_URL from '../../api'

const Login = () => {
    const navigate = useNavigate()
    const { setToken } = useContext(productContext)

    const [email, setMail] = useState('')
    const [password, setPassword] = useState('')

    const url = `${API_URL}/login`

    const changeMailHandler = (e) => {
        setMail(e.target.value)
    }

    const changePasswordHandler = (e) => {
        setPassword(e.target.value)
    }

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
                localStorage.setItem('token', response.data.token)
                setToken(response.data.token)
                alert("Login successful!")
                navigate('/home')
            } else {
                alert("Login failed: Token not received")
            }

        } catch (error) {
            console.error("Login Error:", error.response?.data || error.message)

            alert(
                error.response?.data?.error ||
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

