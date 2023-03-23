import React, { useEffect, useState } from 'react'
import { useThemeContext } from '../ThemeContext'
import { useUserDataContext } from '../AuthContext'
import Search from './Search'
import ContactList from './ContactList'
import NoContacts from './NoContacts'
import './Contacts.css'
import { db } from '../Firebase'
import { getDocs, collection, query, limit } from 'firebase/firestore'

export default function Contacts() {

    const { dark } = useThemeContext()
    const { currentUser } = useUserDataContext()

    const [contactsExist, setContactsExist] = useState(false)

    useEffect(() => {
        (async () => {
            const snapshot = await getDocs(query(collection(db, `users/${currentUser.uid}/contacts`), limit(1)))
            snapshot.docs.length > 0 ?
                setContactsExist(true)
                :
                setContactsExist(false)
        })()
    }, [])

    return (
        <section className={`contacts ${dark ? 'darkSection' : 'lightSection'}`}>
            <Search />
            {
                contactsExist ?
                    <ContactList />
                    :
                    <NoContacts />
            }
        </section>
    )
}
