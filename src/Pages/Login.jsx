import React, { useState, useRef, useEffect } from 'react'
import { useUserDataContext } from '../AuthContext'
import { useNavigate } from 'react-router-dom'
import './Form.css'
import { BiError } from 'react-icons/bi'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../Components/Navbar'

export default function Login() {
    const formData = useRef(null)

    const navigate = useNavigate()

    const { login } = useUserDataContext()

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        localStorage.getItem('c4cUser') &&
        navigate('/chat')

    }, [])

    async function handleLogin(e) {
        e.preventDefault()
        setLoading(true)
        try {
            await login(formData.current.email.value, formData.current.password.value)
            navigate('/chat')
        }
        catch (e) {
            setError(e.message)
        }
        setLoading(false)
    }

    return (
        <div>
            <Navbar />
            <main className='formContainer'>
                <motion.form
                    onSubmit={handleLogin}
                    ref={formData}
                    key='form'
                    initial={{ x: '40vw', opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: '-40vw', opacity: 0 }}
                    transition={{ type: 'tween' }}
                    className='formBox'
                >
                    <h1>Login</h1>

                    {error &&
                        <div className='error'>
                            <BiError /> {error}
                        </div>
                    }

                    <input type='email' name='email' placeholder='Email' />

                    <input type='password' name='password' placeholder='Password' />

                    <button disabled={loading} className='submitBtn' type='submit'>Login</button>

                    <p>Don't have an account? <Link to='/signup'>Sign up</Link></p>
                </motion.form>
            </main>
        </div >
    )
}
