import React, { useEffect, useState } from 'react'
import './Chat.css'
import Navbar from '../Components/Navbar'
import Contacts from '../Components/Contacts'
import ChatWindow from '../Components/ChatWindow'
import { useUserDataContext } from '../AuthContext'
import { OtherPersonContextProvider } from '../OtherPersonContext'
// import { db } from '../Firebase'


export default function Chat() {
  // const { currentUser } = useUserDataContext()
  // const { user } = useMessageContext()

  // useEffect(() => {

  // }, [])

  // const [contacts, setContacts] = useState([])

  // const contacts = ['Iman', 'George', 'John', 'Kyle',
  //   'Iman', 'George', 'John', 'Kyle',
  //   'Iman', 'George', 'John', 'Kyle',
  //   'Iman', 'George', 'John', 'Kyle',
  //   'Iman', 'George', 'John', 'Kyle',
  //   'Iman', 'George', 'John', 'Kyle',
  //   'Iman', 'George', 'John', 'Kyle',
  //   'Iman', 'George', 'John', 'Kyle',
  //   'Iman', 'George', 'John', 'Kyle',
  //   'Iman', 'George', 'John', 'Kyle',
  //   'Iman', 'George', 'John', 'Kyle',
  // ]
  // const messages = ['hi', 'hey', 'how are you?'
  // ]

  return (
    <OtherPersonContextProvider>
      <div>
        <Navbar login={true} />
        <main className='chatPage'>
          <Contacts />
          <ChatWindow />
        </main>
      </div>
    </OtherPersonContextProvider>
  )
}
