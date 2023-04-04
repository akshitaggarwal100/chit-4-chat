import React from 'react'
import './Contact.css'
import { useOtherPersonContext } from '../OtherPersonContext'
import { BsFillFilePersonFill } from 'react-icons/bs'
import { useThemeContext } from '../ThemeContext'

export default function Contact({ contactData, mobile, setShowWindow }) {
    const { other, changeOther } = useOtherPersonContext()
    const { dark, colors } = useThemeContext()

    function changeActiveContact(contact) {
        mobile && setShowWindow(true)
        changeOther(contact)
    }

    const contact = contactData.data

    return (
        <div
            onClick={() => changeActiveContact(contactData)}
            className={`contact ${contactData.chatID === other.chatID ? dark ? 'aContact_dm' : 'aContact_lm' : dark ? 'naContact_dm' : 'naContact_lm'}`}
            style={{ color: dark ? colors.dark.text : colors.light.text }}
        >
            {
                contact.photoURL ?
                    <img className='userPhoto' src={contact.photoURL} />
                    :
                    <div className='defaultPhoto'>
                        <BsFillFilePersonFill />
                    </div>
            }
            <p className='contactName'>{contact.name}</p>
        </div>
    )
}
