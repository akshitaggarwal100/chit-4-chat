import React from 'react'
import './MessageBox.css'
import { BiSend } from 'react-icons/bi'
import { db } from '../Firebase'
import { useThemeContext } from '../ThemeContext'
import { useUserDataContext } from '../AuthContext'
import { useOtherPersonContext } from '../OtherPersonContext'
import { addDoc, collection } from 'firebase/firestore'

export default function MessageBox() {
    const { currentUser } = useUserDataContext()
    const { other } = useOtherPersonContext()
    const { dark, colors } = useThemeContext()

    function handleMessageSend(e) {
        e.preventDefault()
        const messageObj = { from: currentUser.uid, text: e.target.message.value }
        addDoc(collection(db, `${other.chatID}`), messageObj)
    }

    return (
        <form
            onSubmit={handleMessageSend}
            className='messageBox'
            style={{ backgroundColor: dark ? colors.dark.BG : colors.light.BG }}
        >
            <input name='message' type='text' className='messageInput' placeholder='Enter Mesaage' />
            <button className='sendBtn'>
                <BiSend />
            </button>
        </form>
    )
}
