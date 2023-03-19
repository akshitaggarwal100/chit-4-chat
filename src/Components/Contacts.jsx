import React, { useEffect, useState } from 'react'
import { TiContacts } from 'react-icons/ti'
import { BsFillFilePersonFill } from 'react-icons/bs'
import { useThemeContext } from '../ThemeContext'
import { useOtherPersonContext } from '../OtherPersonContext'
import { useUserDataContext } from '../AuthContext'
import Search from './Search'
import './Contacts.css'
import { db } from '../Firebase'
import { getDoc, getDocs, deleteDoc, collection, doc } from 'firebase/firestore'

export default function Contacts() {

    const { dark } = useThemeContext()
    const { other, changeOther } = useOtherPersonContext()
    const { currentUser } = useUserDataContext()

    // const [activeContact, setActiveContact] = useState()
    const [contacts, setContacts] = useState([])

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
        <section className={`contacts ${dark ? 'darkSection' : 'lightSection'}`}>
            <Search />
            {contacts.length !== 0 ?
                contacts.map((contactData) => {
                    
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
                :
                <div className='noContacts'>
                    <TiContacts className='noContactIcon' />
                    <p>Search and find people</p>
                </div>
            }
        </section>
    )
}
