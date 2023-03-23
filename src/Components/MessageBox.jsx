import React from 'react'
import './MessageBox.css'
import { BiSend } from 'react-icons/bi'
import { useThemeContext } from '../ThemeContext'

export default function MessageBox() {

    const { dark, colors } = useThemeContext()

    function handleMessageSend(e) {
        e.preventDefault()

    }

    return (
        <form
            onSubmit={handleMessageSend}
            className='messageBox'
            style={{ backgroundColor: dark ? colors.dark.BG : colors.light.BG }}
        >
            <input type="text" className='messageInput' placeholder='Enter Mesaage' />
            <button className='sendBtn'>
                <BiSend />
            </button>
        </form>
    )
}
