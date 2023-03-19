import React from 'react'
import { Navigate } from 'react-router-dom'
import { useUserDataContext } from '../AuthContext'

export default function ProtectedRoute({ children }) {
    const { currentUser } = useUserDataContext()

    if (currentUser) {
        return children 
    }
    else {
        return <Navigate to='/' />
    }
}
