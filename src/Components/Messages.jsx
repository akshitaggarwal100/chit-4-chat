import React, { useState, useEffect } from 'react'
import './Messages.css'
import { db } from '../Firebase'
import { useOtherPersonContext } from '../OtherPersonContext'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'

export default function Messages() {

    const { other } = useOtherPersonContext()

    const [messages, setMessages] = useState([])

    useEffect(() => {
        const q = query(collection(db, `${other.chatID}`), orderBy('date', 'asc'))
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setMessages(snapshot.docs)
        })
        
        return unsubscribe
    }, [other.chatID])

    return (
        <div className='messages'>
            {messages.map((message) => {
                const messageData = message.data()
                return <p key={message.id}>{messageData.text} from {messageData.from}</p>
            })}
        </div>
    )
}