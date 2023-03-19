import React, { useContext, useEffect, useState } from 'react'
import { auth } from './Firebase'
import {
    signInWithEmailAndPassword,
    signInWithPopup,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signOut,
    sendPasswordResetEmail,
    onAuthStateChanged
} from 'firebase/auth'

const userDataContext = React.createContext(null)

export function UserDataContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('c4cUser')))

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            localStorage.setItem('c4cUser', JSON.stringify(user))
        })

        return unsubscribe
    }, [])

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const googleProvider = new GoogleAuthProvider()
    function googleSignup() {
        return signInWithPopup(auth, googleProvider)
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout() {
        return signOut(auth)
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email)
    }

    const value = {currentUser, signup, googleSignup, login, logout, resetPassword}

    return <userDataContext.Provider value={value}>
        {children}
    </userDataContext.Provider>
}

export function useUserDataContext() {
    return useContext(userDataContext)
}