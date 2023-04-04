import React, { useState } from 'react'
import Contacts from './Contacts'
import ChatWindow from './ChatWindow'

export default function ChatPageMobile() {
    const [showWindow, setShowWindow] = useState(false)

    return (
        showWindow ?
            <ChatWindow setShowWindow={setShowWindow} />
            :
            <Contacts mobile={true} setShowWindow={setShowWindow} />
    )
}
