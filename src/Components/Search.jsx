import React, { useState } from 'react'
import './Search.css'
import { BsPlusLg } from 'react-icons/bs'
import { GoSearch } from 'react-icons/go'
import { RxCross1 } from 'react-icons/rx'
import { BsFillFilePersonFill } from 'react-icons/bs'
import { useThemeContext } from '../ThemeContext'
import { useOtherPersonContext } from '../OtherPersonContext'
import { useUserDataContext } from '../AuthContext'
import { motion, AnimatePresence } from 'framer-motion'
import { addDoc, getDoc, getDocs, where, collection, doc, query, setDoc } from 'firebase/firestore'
import { db } from '../Firebase'

export default function Search() {
    const { dark, colors } = useThemeContext()
    const { changeOther } = useOtherPersonContext()
    const { currentUser } = useUserDataContext()

    const [searchQuery, setSearchQuery] = useState('')

    const [searchResults, setSearchResults] = useState([])

    async function handleSearch(e) {
        const q = e.target.value
        setSearchQuery(q)
        const searchUpperBound = q.slice(0, -1) + String.fromCharCode(q.charCodeAt(q.length - 1) + 1)

        const documents = await getDocs(query(collection(db, 'users'), where('name', '>=', e.target.value), where('name', '<', searchUpperBound)))
        const temp = []

        for (let i = 0; i < documents.docs.length; i++) {
            if (documents.docs[i].data().id !== currentUser.uid) {
                temp.push(documents.docs[i])
            }
        }

        setSearchResults(temp)
    }

    function IDgenerator() {
        const num1 = Math.floor(Math.random() * 90) + 10
        const num2 = Math.floor(Math.random() * 90) + 10
        const char1 = String.fromCharCode(Math.floor(Math.random() * 26) + 65)
        const char2 = String.fromCharCode(Math.floor(Math.random() * 26) + 97)
        const output = num1 + char1 + num2 + char2
        return output
    }

    async function addContact(id) {
        const temp = await getDoc(doc(db, `users/${currentUser.uid}/contacts`, id))

        if (temp.exists()) { }

        else {
            const contactObj = { id, chatID: IDgenerator() }

            await setDoc(doc(db, `users/${currentUser.uid}/contacts`, id), contactObj)
        }
    }

    async function changeActiveContact(data) {
        // changeOther(contact)
        const snapshot = await addDoc(collection(doc(db, 'users', currentUser.uid), 'contacts'), { name: data.name, id: data.id, photoURL: data.photoURL })
        console.log(snapshot)
    }

    return (
        <div className='search'>
            <div className='searchBar' style={{ backgroundColor: dark ? colors.dark.BG : colors.light.BG }}>
                <input
                    onChange={handleSearch}
                    value={searchQuery}
                    className='searchInput'
                    id='searchInput'
                    type='text'
                    placeholder='Search user'
                    style={{ color: dark ? colors.dark.text : colors.light.text }}
                />
                <AnimatePresence mode='wait'>
                    {
                        searchQuery ?
                            <motion.button
                                key='cross'
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className='searchBtn'
                                style={{ color: dark ? colors.dark.text : colors.light.text }}
                                onClick={() => setSearchQuery('')}
                            >
                                <RxCross1 />
                            </motion.button>
                            :
                            <motion.button
                                htmlFor='searchInput'
                                key='search'
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className='searchBtn'
                                style={{ color: dark ? colors.dark.text : colors.light.text }}
                            >
                                <label htmlFor='searchInput'>
                                    <GoSearch />
                                </label>
                            </motion.button>
                    }
                </AnimatePresence>
            </div>
            <AnimatePresence>
                {searchQuery &&
                    <motion.div
                        key='searchResults'
                        initial={{ originY: 0, scaleY: 0, opacity: 0 }}
                        animate={{ originY: 0, scaleY: 1, opacity: 1 }}
                        exit={{ originY: 0, scaleY: 0, opacity: 0 }}
                        transition={{ type: 'tween' }}
                        className='searchResults'
                        style={{ backgroundColor: dark ? colors.dark.BG : colors.light.BG }}
                    >
                        {
                            searchResults.length !== 0 ?
                                searchResults.map((searchResult) => {
                                    const SRdata = searchResult.data()
                                    return (
                                        <div
                                            key={SRdata.id}
                                            className={`searchResult ${dark ? 'naContact_dm' : 'naContact_lm'}`}
                                        >
                                            <div className='searchResultInfo'>
                                                {
                                                    SRdata.photoURL ?
                                                        <img className='userPhoto' src={SRdata.photoURL} />
                                                        :
                                                        <div className='defaultPhoto'>
                                                            <BsFillFilePersonFill />
                                                        </div>
                                                }
                                                <p className='contactName'>{SRdata.name}</p>
                                            </div>
                                            <button
                                                onClick={() => addContact(SRdata.id)}
                                                className='addContactBtn'
                                                style={{ color: dark ? colors.dark.text : colors.light.text }}
                                            >
                                                <BsPlusLg />
                                            </button>
                                        </div>
                                    )
                                })
                                :
                                <div className='noResults'>
                                    <p>No results found</p>
                                </div>
                        }
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    )
}
