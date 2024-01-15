import { ReactNode, createContext, useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../services/firebaseConnection'


type AuthContextData = {
    user: UserProps | null;
    signed: boolean;
    loading: boolean;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

interface UserProps{
    name: string | null;
    email: string | null;
    uid: string;
}

function AuthProvider({ children }: AuthProviderProps) {

    const [user,setUser] = useState<UserProps | null>(null)
    const [loading,setLoading] = useState<boolean>(true)

    useEffect(() => {
        const onsub = onAuthStateChanged(auth, (user) => {
            if(user){
                const { displayName, email, uid } = user
                setUser({
                    name: displayName,
                    email,
                    uid,
                })
                setLoading(false)
            } else {
                setUser(null)
                setLoading(false)
            }
        
        })
        return () => {
            onsub()
        }
    },[])

    return (
        <AuthContext.Provider value={{ user, signed: !!user, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider