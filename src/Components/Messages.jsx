import React, { useState, useEffect, useRef } from 'react'
import './Messages.css'
import Message from './Message'
import { db } from '../Firebase'
import { useOtherPersonContext } from '../OtherPersonContext'
import { useThemeContext } from '../ThemeContext'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'


export default function Messages() {

    const { dark, colors } = useThemeContext()
    const { other } = useOtherPersonContext()

    const [messages, setMessages] = useState([])

    // function todaysDate() {
    //     const dateObj = new Date()
    //     const date = dateObj.getDate() + '/' + dateObj.getMonth() + '/' + dateObj.getFullYear()
    //     return date
    // }

    // const [date, setDate] = useState(null)

    useEffect(() => {
        const q = query(collection(db, `${other.chatID}`), orderBy('time', 'asc'))
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setMessages(snapshot.docs)
        })

        return unsubscribe
    }, [other.chatID])

    let date = false

    return (
        <div className='messages'>
            {messages.map((message) => {
                const messageData = message.data()

                const dateTime = messageData.time && messageData.time.toDate()
                const messageDate = dateTime && dateTime.getDate() + '/' + (dateTime.getMonth() + 1) + '/' + dateTime.getFullYear()
                let flag = false

                if (date !== messageDate) {
                    date = messageDate
                    flag = true
                }

                return (
                    <React.Fragment key={message.id}>
                        {flag &&
                            <div
                                className='date'
                                style={{ backgroundColor: dark ? colors.dark.FG3 : colors.light.FG3 }}
                            >
                                {messageDate}
                            </div>}
                        <Message message={message} messageData={messageData} />
                    </React.Fragment>
                )
            })}
        </div>
    )
}