import React, { useState, useEffect } from 'react'
import './Messages.css'

export default function Messages() {

    useEffect(() => {
        (async () => {
            const snapshot = await getDocs(collection(db, `${other.chatID}`))
            setMessages(snapshot)
        })()
    }, [])

    const [messages, setMessages] = useState([])

    return (
        <div className='messages'>
            {messages.map((message) => {
                const messageData = message.data()
                return <p key={message.id}>{messageData.text}</p>
            })}
            <p>lorem*100</p>
        </div>
    )
}