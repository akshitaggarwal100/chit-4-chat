import React from 'react'
import './NoMessages.css'
import { useThemeContext } from '../ThemeContext'
import { BiMessageSquareDetail } from 'react-icons/bi'

export default function NoMessages() {
    const { dark, colors } = useThemeContext()

    return (
        <div className={`noMessages ${dark ? 'darkSection' : 'lightSection'}`}>
            <BiMessageSquareDetail className='messageIcon' />
            <p>C4C Messaging app by Akshit Aggarwal</p>
        </div>
    )
}
