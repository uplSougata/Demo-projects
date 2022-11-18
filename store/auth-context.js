
//import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
    token: '',
    isAuthenticate: false,
    authenticate: (token) => { },
    logout: () => { }
});

function AuthcontextProvider({ children }) {
    const [authToken, setAuthToken] = useState();

    // useEffect(() => {
    //     async function fetchToken() {
    //         const storedToken = await AsyncStorage.getItem('token');

    //         if (storedToken) {
    //             setAuthToken(storedToken);
    //         }
    //     }
    //     fetchToken();
    // },[]);

    function authenticate(token) {
        setAuthToken(token);
       // AsyncStorage.setItem('token', token);
    }

    function logout() {
        setAuthToken(null);
    }

    const value = {
        token: authToken,
        isAuthenticate: !!authToken,
        authenticate: authenticate,
        logout: logout,
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthcontextProvider;