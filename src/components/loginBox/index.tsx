import styles from './Style.module.sass'
import { GoMarkGithub } from "react-icons/go";
import { useContext, useEffect } from 'react';
import { api } from '../../api/api';
import { authContext } from '../../context/auth';




export function LoginBox(){

    const {signInUrl,user} = useContext(authContext)

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