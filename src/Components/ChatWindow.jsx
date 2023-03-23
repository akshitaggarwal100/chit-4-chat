import React from 'react'
import './ChatWindow.css'
import ContactHeader from './ContactHeader'
import Messages from './Messages'
import MessageBox from './MessageBox'
import NoMessages from './NoMessages'
import { useThemeContext } from '../ThemeContext'
import { useOtherPersonContext } from '../OtherPersonContext'

export default function ChatWindow() {
  const { dark } = useThemeContext()
  const { other } = useOtherPersonContext()

  return (
    <>
      {
        other.chatID !== 0 ?
          <section className={`chatWindow ${dark ? 'darkSection' : 'lightSection'}`}>
            <ContactHeader />
            <Messages />
            <MessageBox />
          </section>
          :
          <NoMessages />
      }
    </>
  )
}
