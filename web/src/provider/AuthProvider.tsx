import { createContext, useContext,  useState, type ReactNode } from "react";

interface IContext {
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>
    isLogin:boolean
}


const Context = createContext<IContext>({} as IContext)

export const useAuth = () => useContext(Context);

export default function AuthProvider ({children}:Readonly<{children:ReactNode}>) {
    const [isLogin, setIsLogin] = useState(false)

    return <Context.Provider value={{isLogin, setIsLogin}}>{children}</Context.Provider>
}

