import React, {createContext, useContext, useState, ReactNode, useEffect} from 'react';

interface UserContextProps {
    userId: number | null;
    setUserId: React.Dispatch<React.SetStateAction<number | null>>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [username, setusername] = useState<string | null>()
    const [userId, setUserId] = useState<number | null>(() => {
        const storedUserId = localStorage.getItem('userId');
        return storedUserId ? Number(storedUserId) : null;
    });

    useEffect(() => {
        console.log('UserProvider mounted');
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(Number(storedUserId));
        }
        return () => {
            console.log('UserProvider unmounted');
        };
    }, []);
    return (
        <UserContext.Provider value={{ userId, setUserId }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};
