import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Form.css'
import { BiError } from 'react-icons/bi'
import { FcGoogle } from 'react-icons/fc'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../Components/Navbar'
import { useUserDataContext } from '../AuthContext'
import { useThemeContext } from '../ThemeContext'
import { db } from '../Firebase'
import { doc, getDoc, setDoc, addDoc, deleteDoc, collection } from 'firebase/firestore'


export default function Signup() {
  const { dark, colors } = useThemeContext()
  const navigate = useNavigate()

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const formData = useRef(null)

  const { signup, googleSignup } = useUserDataContext()

  async function handleSignup(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const user = await signup(formData.current.email.value, formData.current.password.value)
      const userObj = { id: user.user.uid, name: formData.current.name.value, photoURL: user.user.photoURL }
      await setDoc(doc(db, 'users', user.user.uid), userObj)
      navigate('/chat')
    }
    catch (e) {
      setError(e.message)
    }
    setLoading(false)
  }

  async function handleGoogleSignup(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const user = await googleSignup()

      const document = await getDoc(doc(db, 'users', user.user.uid))

      if (document.exists()) { }

      else {
        const userObj = { id: user.user.uid, name: user.user.displayName, photoURL: user.user.photoURL }
        await setDoc(doc(db, 'users', user.user.uid), userObj)
      }

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
          onSubmit={handleSignup}
          ref={formData}
          key='form'
          initial={{ x: '40vw', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '-40vw', opacity: 0 }}
          transition={{ type: 'tween' }}
          className='formBox'
        >
          <h1>Signup</h1>

          {error &&
            <div className='error'>
              <BiError /> {error}
            </div>
          }

          <input type='text' name='name' placeholder='Name' />

          <input type='email' name='email' placeholder='Email' />

          <input type='password' name='password' placeholder='Password' />

          <button className='submitBtn' disabled={loading} type='submit'>Sign up</button>

          <button
            style={{ color: dark ? colors.dark.text : colors.light.text }}
            disabled={loading}
            className='googleBtn'
            onClick={handleGoogleSignup}>
            Sign up with <FcGoogle />
          </button>

          <p>Have an account? <Link to='/login'>Log in</Link></p>
        </motion.form>
      </main>
    </div>
  )
}
