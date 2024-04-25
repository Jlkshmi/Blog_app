import { createContext, useState } from "react";

const UserContext = createContext({})
export const UserDataProvider = ({children})=>{
    const [user,setUser]= useState(JSON.parse(localStorage.getItem("blogger")))
    

return(
    <UserContext.Provider value={{user,setUser}}>  
        {children}
    </UserContext.Provider>
)
}
export default UserContext;

