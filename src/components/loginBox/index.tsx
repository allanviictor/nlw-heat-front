import styles from './Style.module.sass'
import { GoMarkGithub } from "react-icons/go";
import { useEffect } from 'react';
import { api } from '../../api/api';


type ReturnAuthenticate = {
    token:string;
    user: {
        avatar_url: string;
        github_id: string;
        id: string;
        login: string;
        name: string;
    }
}

export function LoginBox(){

    let signInUrl = 'https://github.com/login/oauth/authorize?scope=user&client_id=5734101069953dcc6bc5'


    async function SignIn(code:string){
        let authenticate = await api.post<ReturnAuthenticate>('/authenticate',{
            code
        })

        let { token, user } = authenticate.data
        window.localStorage.setItem('nlwtoken',token)
        console.log(authenticate.data)
    }

    useEffect(()=> {
        let url = window.location.href
        let hasCode = url.includes('?code=')
        
        if(hasCode){
            let [urlWithoutCode, code] = url.split('?code=')

           history.pushState({}, "", urlWithoutCode);

           SignIn(code)
        }

    },[])

    return (
        <>
            <div className={styles.wrapperLoginBox}>
                <h3>
                    Envie e compartilhe sua mensagem
                </h3>
                <a href={signInUrl} type='button' className={styles.buttonLogin}>
                    <GoMarkGithub className={styles.icon}/>
                    entrar com Github
                </a>
            </div>
        </>
    )
}