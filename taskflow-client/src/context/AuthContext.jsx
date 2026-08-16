import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token"));

    function loginUser(newToken) {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    }

    function logoutUser() {
        localStorage.removeItem("token");
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{ token, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
}