import React from 'react'
import './Message.css'
import { useUserDataContext } from '../AuthContext'
import { useThemeContext } from '../ThemeContext'

export default function Message({ messageData }) {

    const { dark, colors } = useThemeContext()
    const { currentUser } = useUserDataContext()

    return (
        <div
            className={`message ${messageData.from === currentUser.uid ? 'right' : 'left'}`}
        >
            <p
                className={`messageText ${messageData.from === currentUser.uid ? 'rightText' : 'leftText'}`}
                style={{
                    backgroundColor: dark ?
                        (messageData.from === currentUser.uid ?
                            colors.dark.FG
                            :
                            colors.dark.FG2)
                        :
                        (messageData.from === currentUser.uid ?
                            colors.light.FG
                            :
                            colors.light.FG2),
                    color: messageData.from === currentUser.uid && colors.light.text
                }}
            >
                {messageData.text}
            </p>
        </div>
    )
}