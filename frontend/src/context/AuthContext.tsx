import {
    createContext,
    useContext,
    useState,
} from "react";

interface UserInfo {
    name: string;
    email: string;
}

interface AuthContextType {
    token: string | null;
    user: UserInfo | null;
    login: (
        token: string,
        user: UserInfo
    ) => void;
    logout: () => void;
}

const AuthContext =
    createContext<AuthContextType | null>(
        null
    );

const getStoredUser =
    (): UserInfo | null => {
        const stored =
            localStorage.getItem("user");
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch {
                return null;
            }
        }
        return null;
    };

export const AuthProvider = ({
    children,
}: any) => {
    const [token, setToken] =
        useState<string | null>(
            localStorage.getItem("token")
        );

    const [user, setUser] =
        useState<UserInfo | null>(
            getStoredUser()
        );

    const login = (
        token: string,
        user: UserInfo
    ) => {
        localStorage.setItem(
            "token",
            token
        );

        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );

        setToken(token);
        setUser(user);
    };

    const logout = () => {
        localStorage.removeItem(
            "token"
        );

        localStorage.removeItem(
            "user"
        );

        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () =>
    useContext(AuthContext)!;