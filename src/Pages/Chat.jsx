import React, { useState, useEffect } from 'react'
import './Chat.css'
import Navbar from '../Components/Navbar'
import Contacts from '../Components/Contacts'
import ChatWindow from '../Components/ChatWindow'
import ChatPageMobile from '../Components/ChatPageMobile'
import { OtherPersonContextProvider } from '../OtherPersonContext'

export default function Chat() {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    function changeSize() {
      setWidth(window.innerWidth)
    }

    window.addEventListener('resize', changeSize)

    return () => { window.removeEventListener('resize', changeSize) }
  }, [])

  return (
    <OtherPersonContextProvider>
      <Navbar login={true} />
      {
        width > 830 ?
          <main className='chatPage'>
            <Contacts mobile={false} />
            <ChatWindow />
          </main>
          :
          <main className='chatPage'>
            <ChatPageMobile />
          </main>
      }
    </OtherPersonContextProvider>
  )
}