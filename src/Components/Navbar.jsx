import React, { useState } from 'react'
import './Navbar.css'
import { useUserDataContext } from '../AuthContext'
import { TiThMenu } from 'react-icons/ti'
import { FaMoon } from 'react-icons/fa'
import { BsSunFill } from 'react-icons/bs'
import { motion, AnimatePresence } from 'framer-motion'
import { useThemeContext } from '../ThemeContext'

export default function Navbar({ login }) {

    const { logout } = useUserDataContext()

    const { dark, switchTheme } = useThemeContext()
    const [menu, setMenu] = useState(false)

    function handleLogout() {
        localStorage.setItem('c4cUser', JSON.stringify(null))
        logout()
    }

    return (
        <nav className='navbar'>
            <div className='logo'>C<span className='four'>4</span>C</div>
            <div className='sideControl'>
                <AnimatePresence initial={false} mode='wait'>
                    {
                        dark ?
                            <motion.button
                                key={'lb'}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 20, opacity: 0 }}
                                onClick={() => switchTheme()}
                                className='sideControlBtn themeBtn ltb'
                            >
                                <BsSunFill />
                            </motion.button>
                            :
                            <motion.button
                                key={'db'}
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                onClick={() => switchTheme()}
                                className='sideControlBtn themeBtn dtb'
                            >
                                <FaMoon />
                            </motion.button>
                    }
                    </AnimatePresence>

                    {login && <motion.button
                        onClick={() => setMenu(!menu)}
                        className={`sideControlBtn menuBtn ${dark ? 'dmb' : 'lmb'}`}
                    >
                        <TiThMenu />
                    </motion.button>}

                    <AnimatePresence>
                    {
                        menu && <motion.button
                            onClick={handleLogout}
                            key='menu'
                            initial={{ originY: 0, originX: '5rem', scale: 0 }}
                            animate={{ originY: 0, originX: '5rem', scale: 1 }}
                            exit={{ originY: 0, originX: '5rem', scale: 0 }}
                            transition={{ type: 'tween', duration: 0.2 }}
                            whileHover={{ borderColor: '#e63946', backgroundColor: '#e63946' }}
                            className='menu'
                            style={{ color: dark ? 'white' : '#202023' }}
                        >
                            Logout
                        </motion.button>
                    }

                </AnimatePresence>
            </div>
        </nav>
    )
}
