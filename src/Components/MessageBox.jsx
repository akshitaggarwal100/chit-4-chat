import React, { useEffect, useState } from 'react'
import './MessageBox.css'
import { BiSend } from 'react-icons/bi'
import { db } from '../Firebase'
import { useThemeContext } from '../ThemeContext'
import { useUserDataContext } from '../AuthContext'
import { useOtherPersonContext } from '../OtherPersonContext'
import { addDoc, collection, doc, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore'

export default function MessageBox() {
    const { currentUser } = useUserDataContext()
    const { other } = useOtherPersonContext()
    const { dark, colors } = useThemeContext()
    const [msgLeftState, setMsgLeftState] = useState(0)

    useEffect(() => {
        const senderRef = doc(db, `users/${currentUser.uid}/contacts/${other.data.id}`)

        const unsubscribe = onSnapshot(senderRef, (senderDoc) => {
            setMsgLeftState(senderDoc.data().msgLeft)
        }, [])

        return () => { unsubscribe() }
    })

    async function handleMessageSend(e) {
        e.preventDefault()

        const senderRef = doc(db, `users/${currentUser.uid}/contacts/${other.data.id}`)
        const receiverRef = doc(db, `users/${other.data.id}/contacts/${currentUser.uid}`)

        if (msgLeftState && e.target.message.value) {
            const messageObj = {
                from: currentUser.uid,
                to: other.data.id,
                text: e.target.message.value,
                time: serverTimestamp()
            }

            await addDoc(collection(db, `${other.chatID}`), messageObj)
            await setDoc(senderRef, { chatID: other.chatID, id: other.data.id, msgLeft: msgLeftState - 1 })
            await setDoc(receiverRef, { chatID: other.chatID, id: currentUser.uid, msgLeft: 4 - (msgLeftState - 1) })
            setMsgLeftState(msgLeftState - 1)

            e.target.message.value = ''
        }
    }

    return (
        <form
            onSubmit={handleMessageSend}
            className='messageBox'
            style={{ backgroundColor: dark ? colors.dark.BG : colors.light.BG }}
        >
            <input
                required
                name='message'
                type='text'
                style={{ color: dark ? colors.dark.text : colors.light.text }}
                className='messageInput'
                placeholder='Enter Message' />
            <button
                style={{ color: dark ? colors.dark.text : colors.light.text }}
                className='sendBtn'>
                <BiSend />
            </button>
        </form>
    )
}
