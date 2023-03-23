import React, { useEffect, useState } from 'react'
import { BsFillFilePersonFill } from 'react-icons/bs'
import { db } from '../Firebase'
import { getDoc, getDocs, collection, doc, deleteDoc } from 'firebase/firestore'
import { useUserDataContext } from '../AuthContext'
import { useOtherPersonContext } from '../OtherPersonContext'
import { useThemeContext } from '../ThemeContext'

export default function ContactList() {
    const [contacts, setContacts] = useState([])
    const { other, changeOther } = useOtherPersonContext()
    const { currentUser } = useUserDataContext()
    const {dark} = useThemeContext()

    useEffect(() => {
        (async () => {

            // fetching all contacts
            const snapshot = await getDocs(collection(db, `users/${currentUser.uid}/contacts`))

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

        })()
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