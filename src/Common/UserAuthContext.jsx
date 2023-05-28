import { createContext, useContext, useEffect, useState } from "react";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile
} from "firebase/auth";

import { auth } from "./dbconfig";
const userAuthContext = createContext();
export function UserAuthContextProvider({ children }) {
    const [user, setUser] = useState({});
    const logIn = async (email, password) => {
        await signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                localStorage.setItem("user", JSON.stringify(auth.currentUser));
            })
    }
    
    const signUp = async (username, email, password) => {
        await createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                return updateProfile(auth.currentUser, {
                    displayName: username
                });
            })
            .then(() => {
                localStorage.setItem("user", JSON.stringify(auth.currentUser));
            })

    }

    const logOut = async () => {
        await signOut(auth)
            .then(() => {
                localStorage.removeItem("user");
            })
    }

    function googleSignIn() {
        const googleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleAuthProvider);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
            console.log("Auth", currentuser);
            setUser(currentuser);

        });
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <userAuthContext.Provider
            value={{ user, logIn, signUp, logOut, googleSignIn }}
        >
            {children}
        </userAuthContext.Provider>
    );
}
export function useUserAuth() {
    return useContext(userAuthContext);
}