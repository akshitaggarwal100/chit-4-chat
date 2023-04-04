import React, { useContext, useState } from "react";

const otherPersonContext = React.createContext()

export function OtherPersonContextProvider({ children }) {
    const [other, setOther] = useState({ chatID: 0 })

    function changeOther(other) {
        setOther(other)
    }

    const value = { other, changeOther }

    return (
        <otherPersonContext.Provider value={value}>
            {children}
        </otherPersonContext.Provider>
    )
}

export function useOtherPersonContext() {
    return useContext(otherPersonContext)
}
