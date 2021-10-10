import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
} from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import '../firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    // SIGNUP FUNCTION
    const signUp = async (email, password, username) => {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password);

        // UPDATE PROFILE
        await updateProfile(auth.currentUser, { displayName: username });

        // UPDATE USER
        setCurrentUser({ ...auth.currentUser });
    };

    // LOGIN FUNCTION
    const logIn = (email, password) => {
        const auth = getAuth();

        return signInWithEmailAndPassword(auth, email, password);
    };

    // LOGOUT FUNCTION
    const logOut = () => {
        const auth = getAuth();
        return signOut(auth);
    };

    const value = {
        currentUser,
        signUp,
        logIn,
        logOut,
    };

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
