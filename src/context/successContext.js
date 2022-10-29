import {createContext, useState} from 'react'
export const SuccessContext = createContext()

export default function SuccessContextComponent(
    {children}){ 
    const [showModal, setShowModal]= useState(false)                                   
    
    const setShowModalTrue=()=>{
        setShowModal(true)
    }
    const setShowModalFalse=()=>{
        setShowModal(false)
    }
    return(
        <SuccessContext.Provider value={{
            showModal, setShowModalFalse, setShowModalTrue
        }}>
            {children}
        </SuccessContext.Provider>
    )
}
