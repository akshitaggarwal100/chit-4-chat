import React, { useState, useEffect } from 'react'
import { useThemeContext } from '../ThemeContext'
import { useOtherPersonContext } from '../OtherPersonContext'
import { BsFillFilePersonFill } from 'react-icons/bs'

export default function ContactHeader() {
    const { dark, colors } = useThemeContext()
    const { other } = useOtherPersonContext()
    const contactData = other.data

    return (
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
    )
}
