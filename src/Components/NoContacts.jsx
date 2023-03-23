import React from 'react'
import { TiContacts } from 'react-icons/ti'

export default function NoContacts() {
    return (
        <div className='noContacts'>
            <TiContacts className='noContactIcon' />
            <p>Search and find people</p>
        </div>
    )
}