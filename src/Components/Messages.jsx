import React, { useState, useEffect } from 'react'
import './Messages.css'
import { db } from '../Firebase'
import { useOtherPersonContext } from '../OtherPersonContext'
import { getDocs, collection, onSnapshot, query, orderBy } from 'firebase/firestore'

export default function Messages() {

    const { other } = useOtherPersonContext()

    useEffect(() => {
        // (async () => {
        const q = query(collection(db, `${other.chatID}`), orderBy('date', 'asc'))
        const unsubscribe = onSnapshot(q, (snapshot) => setMessages(snapshot.docs))
        // })()

        return unsubscribe
    }, [])

    const [messages, setMessages] = useState([])

    return (
        <div className='messages'>
            {messages.map((message) => {
                const messageData = message.data()
                return <p key={message.id}>{messageData.text} from {messageData.from}</p>
            })}
        </div>
    )
}