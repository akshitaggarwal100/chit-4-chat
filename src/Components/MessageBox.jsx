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
        // const dateObj = new Date()
        // const date = `${dateObj.getDate()}-${dateObj.getMonth()}-${dateObj.getFullYear()}`
        // const time = `${dateObj.getHours()}Hr ${dateObj.getMinutes()}Min ${dateObj.getSeconds()}Sec`
        const messageObj = {
            from: currentUser.uid,
            text: e.target.message.value,
            // time: firebase.database.ServerValue.TIMESTAMP,
            date: new Date()
        }
        addDoc(collection(db, `${other.chatID}`), messageObj)
        e.target.message.value = ''
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
