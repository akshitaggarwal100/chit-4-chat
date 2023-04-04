import './App.css'
import { AnimatePresence } from 'framer-motion'
import { Routes, Route, useLocation } from 'react-router-dom'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import ProtectedRoute from './Components/ProtectedRoute'
import Chat from './Pages/Chat'
import { ThemeContextProvider } from './ThemeContext'
import { UserDataContextProvider } from './AuthContext'
import ChatWindow from './Components/ChatWindow'
import { OtherPersonContextProvider } from './OtherPersonContext'

function App() {
  const location = useLocation()

  return (
    <ThemeContextProvider>
      <UserDataContextProvider>
        <AnimatePresence mode='wait'>
          <Routes key={location.key} location={location}>
            <Route path='/' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route
              path='/chat'
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              }>
            </Route>
          </Routes>
        </AnimatePresence>
      </UserDataContextProvider>
    </ThemeContextProvider>
  )
}

export default App
