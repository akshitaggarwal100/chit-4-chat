import React, { useEffect, useState } from 'react'
import './Contacts.css'
import { useThemeContext } from '../ThemeContext'
import { useUserDataContext } from '../AuthContext'
import Search from './Search'
import ContactList from './ContactList'
import NoContacts from './NoContacts'
import { db } from '../Firebase'
import { collection, query, limit, onSnapshot } from 'firebase/firestore'

export default function Contacts({ mobile, setShowWindow }) {

    const { dark } = useThemeContext()
    const { currentUser } = useUserDataContext()

    const [contactsExist, setContactsExist] = useState(false)


    function funcToCheck(snapshot) {
        snapshot.docs.length > 0 ?
            setContactsExist(true)
            :
            setContactsExist(false)
    }

    useEffect(() => {
        const queryToCheck = query(collection(db, `users/${currentUser.uid}/contacts`), limit(1))
        const unsubscribe = onSnapshot(queryToCheck, funcToCheck)

        return () => {
            unsubscribe()
        }
    }, [])

    return (
        <section className={`contacts ${dark ? 'darkSection' : 'lightSection'}`}>
            <Search />
            {
                contactsExist ?
                    <ContactList mobile={mobile} setShowWindow={setShowWindow} />
                    :
                    <NoContacts />
            }
        </section>
    )
}
