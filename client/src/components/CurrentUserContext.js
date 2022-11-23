import { createContext, useEffect, useState } from "react";
import {useAuth0} from '@auth0/auth0-react'

export const CurrentUserContext = createContext(null)

export const CurrentUserProvider = ({children}) => {

    const { user, isAuthenticated, isLoading } = useAuth0();
    const [currentUser, setCurrentUser] = useState(null)
    // console.log(user)
    // console.log(isAuthenticated)
    
    useEffect(()=>{
        
        const checkUser = async () => {
            console.log("hello")
            try {
            const res = await fetch('/find-user', {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email: user.email})
            })
            const data= await res.json()
            // console.log(data)
            if (data.status === 200) {
                setCurrentUser(data.data)
            }
            else {
                const addUser = await fetch('/add-user', {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({email: user.email, handle:user.nickname, displayName: user.name})
                })
                const userInfo = await addUser.json()
                setCurrentUser(userInfo.data)
            }
        }
            catch(error) {
                console.log(error)
            }
        }
        if (isAuthenticated) {
                checkUser()
            }
    },[isAuthenticated])
    
    return (
        <CurrentUserContext.Provider value={{currentUser, setCurrentUser, user, isAuthenticated}}>
            {children}
        </CurrentUserContext.Provider>
    )
}