import { createContext, useState } from "react";
import App from "./App";

const UserContext=createContext({});

const UserContextProvider=()=>{
    const [userInfo, setUserInfo]=useState();

    return <UserContext.Provider value={{userInfo, setUserInfo}}>
        <App/>
    </UserContext.Provider>
}

export {UserContext, UserContextProvider};