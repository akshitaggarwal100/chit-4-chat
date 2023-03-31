import React, { useState, useEffect } from 'react'
import './Messages.css'
import { db } from '../Firebase'
import { useThemeContext } from '../ThemeContext'
import { useOtherPersonContext } from '../OtherPersonContext'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { useUserDataContext } from '../AuthContext'

export default function Messages() {

    const { dark, colors } = useThemeContext()
    const { currentUser } = useUserDataContext()
    const { other } = useOtherPersonContext()

    const [messages, setMessages] = useState([])

    useEffect(() => {
        const q = query(collection(db, `${other.chatID}`), orderBy('time', 'asc'))
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setMessages(snapshot.docs)
        })

        return unsubscribe
    }, [other.chatID])

    return (
        <div className='messages'>
            {messages.map((message) => {
                const messageData = message.data()
                return (
                    <div
                        key={message.id}
                        className={`message ${messageData.from === currentUser.uid ? 'right' : 'left'}`}
                    >
                        <p
                            className={`messageText ${messageData.from === currentUser.uid ? 'rightText' : 'leftText'}`}
                            style={{
                                backgroundColor: dark ?
                                    (messageData.from === currentUser.uid ?
                                        colors.dark.FG
                                        :
                                        colors.dark.FG2)
                                    :
                                    (messageData.from === currentUser.uid ?
                                        colors.light.FG
                                        :
                                        colors.light.FG2),
                                color: messageData.from === currentUser.uid && colors.light.text
                            }}
                        >
                            {messageData.text}
                        </p>
                    </div>
                )
            })}
        </div>
    )
}