import React, { useEffect, useState } from 'react'
import Contact from './Contact'
import './ContactList.css'
import { db } from '../Firebase'
import { getDoc, collection, doc, deleteDoc, onSnapshot } from 'firebase/firestore'
import { useUserDataContext } from '../AuthContext'

export default function ContactList({ mobile, setShowWindow }) {
    const [contacts, setContacts] = useState([])

    const { currentUser } = useUserDataContext()

    async function fetchContacts(snapshot) {
        let contactsArray = []
        for (let i = 0; i < snapshot.docs.length; i++) {

            // storing the userID of contact
            const contactID = snapshot.docs[i].id

            // fetching userData of the contact from users collection
            const contactData = await getDoc(doc(db, 'users', contactID))

            if (contactData.exists()) {
                const contactObj = {
                    chatID: snapshot.docs[i].data().chatID,
                    data: contactData.data()
                }
                contactsArray.push(contactObj)
            }
            else {
                await deleteDoc(doc(db, `users/${currentUser.uid}/contacts`, contactID))
            }
        }
        setContacts(contactsArray)
    }

    useEffect(() => {
        // fetching all contacts
        const contactsRef = collection(db, `users/${currentUser.uid}/contacts`)
        const unsubscribe = onSnapshot(contactsRef, fetchContacts)

        return () => {
            unsubscribe()
        }
    }, [])

    return (
        <div className='contactsList'>
            {
                contacts.map((contactData) => {
                    return (
                        <Contact
                            key={contactData.chatID}
                            contactData={contactData}
                            mobile={mobile}
                            setShowWindow={setShowWindow}
                        />
                    )
                })
            }
        </div>
    )
}