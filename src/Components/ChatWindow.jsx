import React, { useEffect, useState } from 'react'
import './ChatWindow.css'
import { BiMessageSquareDetail } from 'react-icons/bi'
import { BsFillFilePersonFill } from 'react-icons/bs'
import { useThemeContext } from '../ThemeContext'
import { useOtherPersonContext } from '../OtherPersonContext'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../Firebase'

export default function ChatWindow() {
  const { dark } = useThemeContext()
  const { other } = useOtherPersonContext()

  useEffect(() => {
    (async () => {
      const snapshot = await getDocs(collection(db, `${other.chatID}`))
      setMessages(snapshot)
    })()
  }, [])

  const [messages, setMessages] = useState([])

  return (
    <>
      {
        other.chatID !== 0 ?
          <section className={`chatWindow ${dark ? 'darkSection' : 'lightSection'}`}>
            <div className='contactHeader'>
              {
                other.data.photoURL ?
                  <img className='contactPhoto' src={other.data.photoURL} />
                  :
                  <div className='defaultContactPhoto'>
                    <BsFillFilePersonFill />
                  </div>
              }
              <h1>{other.data.name}</h1>
            </div>

            {messages.docs.map((message) => {
              const messageData = message.data()
              return <p key={message.id}>{messageData.text}</p>
            })}
          </section>
          :
          <div className={`noMessages ${dark ? 'darkSection' : 'lightSection'}`}>
            <BiMessageSquareDetail className='messageIcon' />
            <p>C4C Messaging app by Akshit Aggarwal</p>
          </div>

      }
    </>
  )
}
