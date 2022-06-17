import React, { createContext,ReactNode, useEffect, useState } from 'react'
import { api } from '../api/api'

type User = {
    avatar_url: string;
    github_id: string;
    id: string;
    login: string;
    name: string;
}

type AuthContextData = {
    user: User | null,
    signInUrl:string;
    signOut: () => void
}

type AuthProvider ={
    children:ReactNode
}

type ReturnAuthenticate = {
    token:string;
    user:User 
}

export let authContext = createContext({} as AuthContextData)



export function AuthProvider(props:AuthProvider){

    let [user,setUser] = useState<User | null>(null)

    let signInUrl = 'https://github.com/login/oauth/authorize?scope=user&client_id=5734101069953dcc6bc5'

    useEffect(()=> {
        let url = window.location.href
        let hasCode = url.includes('?code=')
        
        if(hasCode){
            let [urlWithoutCode, code] = url.split('?code=')

           history.pushState({}, "", urlWithoutCode);

           signIn(code)
        }

    },[])

    useEffect(()=> {
        let getToken = window.localStorage.getItem('nlwtoken')

        
        if(getToken){
            let headerUserProfile:Object ={
                headers:{
                    authorization: "Bearer " + getToken
                }
            }
            api.get<User>('/user/profile',headerUserProfile).then(response=> {
                setUser(response.data)
            })
        }

    },[])


    async function signIn(code:string){
        let authenticate = await api.post<ReturnAuthenticate>('/authenticate',{
            code
        })

        let { token, user } = authenticate.data
        window.localStorage.setItem('nlwtoken',token)
        setUser(user)
    }


    function signOut(){
        setUser(null)
        window.localStorage.removeItem('nlwtoken')
    }



    return (
        <authContext.Provider value={{signInUrl,user, signOut}}>
            { props.children }
        </authContext.Provider>
    )
}