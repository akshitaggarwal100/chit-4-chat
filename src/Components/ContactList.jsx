import React, { useEffect, useState } from 'react'
import './ContactList.css'
import { BsFillFilePersonFill } from 'react-icons/bs'
import { db } from '../Firebase'
import { getDoc, collection, doc, deleteDoc, onSnapshot } from 'firebase/firestore'
import { useUserDataContext } from '../AuthContext'
import { useOtherPersonContext } from '../OtherPersonContext'
import { useThemeContext } from '../ThemeContext'

export default function ContactList() {
    const [contacts, setContacts] = useState([])
    const { other, changeOther } = useOtherPersonContext()
    const { currentUser } = useUserDataContext()
    const { dark } = useThemeContext()

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

        return unsubscribe
    }, [])

    function changeActiveContact(contact) {
        changeOther(contact)
    }

    return (
        <div className='contactsList'>
            {
                contacts?.map((contactData) => {
                    const contact = contactData.data

                    return (
                        <div
                            onClick={() => changeActiveContact(contactData)}
                            key={contact.id}
                            className={`contact ${contactData.chatID === other.chatID ? dark ? 'aContact_dm' : 'aContact_lm' : dark ? 'naContact_dm' : 'naContact_lm'}`}
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
                })
            }
        </div>
    )
}