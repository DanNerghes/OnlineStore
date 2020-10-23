import React, { useEffect, useState } from 'react'
import * as firebase from "firebase/app";
import "firebase/auth";

const initialValue = {
    isAuthenticated: false,
    user: null
}

const AuthContext = React.createContext(initialValue);

function AuthContextProvider({children}) {
    const [value, setvalue] = useState(initialValue)

    useEffect( () => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                setvalue({
                    isAuthenticated: true,
                    user,
                })
            } else {
              setvalue(initialValue)
            }
          });
    }, []);
    
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthContextProvider}