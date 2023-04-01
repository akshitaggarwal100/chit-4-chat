import React, { useState, useEffect, useContext } from "react"

const themeContext = React.createContext(null)

export function ThemeContextProvider({ children }) {

    const colors = {
        light: {
            BG: '#fafafa',
            FG: '#ffcc33',
            FG2: '#cfdbd5',
            FG3: '#f8f9fa',
            text: '#202023'
        },
        dark: {
            BG: '#202023',
            FG: '#ffcc33',
            FG2: '#343a40',
            FG3: '#9a8c98',
            text: 'white'
        }
    }

    const [dark, setDark] = useState(JSON.parse(localStorage.getItem('c4cdark')));

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('c4cdark')) === null) {
            localStorage.setItem('c4cdark', JSON.stringify('true'))
            setDark(true)
        }
        colorSetter(JSON.parse(localStorage.getItem('c4cdark')))
    }, [])

    function switchTheme() {
        setDark(!dark)
        localStorage.setItem('c4cdark', JSON.stringify(!dark))
        colorSetter(!dark)
    }

    function colorSetter(dark) {
        document.body.style.backgroundColor = dark ? colors.dark.BG : colors.light.BG
        document.body.style.color = dark ? colors.dark.text : colors.light.text
    }

    const value = { dark, switchTheme, colors }

    return (
        <themeContext.Provider value={value}>
            {children}
        </themeContext.Provider>
    )
}

export function useThemeContext() {
    return useContext(themeContext)
}