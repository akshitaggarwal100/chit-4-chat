import React from 'react'
import './Chat.css'
import Navbar from '../Components/Navbar'
import Contacts from '../Components/Contacts'
import ChatWindow from '../Components/ChatWindow'

import { OtherPersonContextProvider } from '../OtherPersonContext'

export default function Chat() {

  return (
    <OtherPersonContextProvider>
      {/* <div> */}
        <Navbar login={true} />
        <main className='chatPage'>
          <Contacts />
          <ChatWindow />
        </main>
      {/* </div> */}
    </OtherPersonContextProvider>
  )
}
