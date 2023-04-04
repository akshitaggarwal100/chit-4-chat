import React from 'react'
import './ContactHeader.css'
import { useThemeContext } from '../ThemeContext'
import { useOtherPersonContext } from '../OtherPersonContext'
import { BsFillFilePersonFill } from 'react-icons/bs'
import { TiContacts } from 'react-icons/ti'

export default function ContactHeader({ setShowWindow }) {
    const { dark, colors } = useThemeContext()
    const { other } = useOtherPersonContext()
    const contactData = other.data

    return (
        <div className='headerContainer'>
            <div
                style={{ backgroundColor: dark ? colors.dark.BG : colors.light.BG }}
                className='contactHeader'
            >
                {
                    contactData.photoURL ?
                        <img className='contactPhoto' src={contactData.photoURL} />
                        :
                        <div className='defaultContactPhoto'>
                            <BsFillFilePersonFill />
                        </div>
                }
                <h1 className='contactName'>{contactData.name}</h1>
            </div>
            <button
                onClick={() => { setShowWindow(false) }}
                style={{ backgroundColor: dark ? colors.dark.BG : colors.light.BG, color: dark ? colors.dark.text : colors.light.text }}
                className='contactsBtn'
            >
                <TiContacts />
            </button>
        </div >
    )
}