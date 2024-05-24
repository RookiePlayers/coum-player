/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect } from "react";
import { FirebaseAuth } from "../config/firebase_config";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../slices/authSlice";
import { useProfileMockService } from "../services/useProfileService";

type AuthContextType = {
    login: () => void;
    logout: () => void;
};
export const AuthContext = createContext<AuthContextType | null>(null);
export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
}
export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const dispatch = useDispatch();
    const {getMockProfile} = useProfileMockService();
    const login = () => {
        console.log('login');
    }
    const logout = () => {
        console.log('logout');
    }
    useEffect(() => {
        const unsubscribe = FirebaseAuth.onAuthStateChanged((user) => {
            console.log('onAuthStateChanged', user);
            if(user){
                getMockProfile(user.uid).then((profile) => {
                    dispatch(setCurrentUser(profile));
                });
            }
        });
        return () => unsubscribe();
    }, []);
    return (
        <AuthContext.Provider value={{login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}