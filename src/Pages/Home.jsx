import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Home() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'tween' }}
        >
            <div className='homeLogo'>C<span className='four'>4</span>C</div>
            <main class="home">
                <div class="content">
                    <h1>If you dont text</h1>
                    <h1>They aren't allowed to as well</h1>
                    <div class="buttons">
                        <Link to='/signup' id="homeBtn">Sign up</Link>
                        <Link to='/login' id="homeBtn">Login</Link>
                    </div>
                </div>
            </main>
        </motion.div>
    )
}
