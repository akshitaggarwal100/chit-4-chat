import React, { useState, useEffect } from 'react'
import './Messages.css'
import { db } from '../Firebase'
import { useOtherPersonContext } from '../OtherPersonContext'
import { getDocs, collection } from 'firebase/firestore'

export default function Messages() {

    const { other } = useOtherPersonContext()

    useEffect(() => {
        (async () => {
            const snapshot = await getDocs(collection(db, `${other.chatID}`))
            setMessages(snapshot.docs)
        })()
    }, [])

    const [messages, setMessages] = useState([])

    return (
        <div className='messages'>
            {messages.map((message) => {
                const messageData = message.data()
                return <p key={message.id}>{messageData.text}</p>
            })}
        </div>
    )
}