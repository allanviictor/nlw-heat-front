import styles from './Style.module.sass'
import { GoMarkGithub } from "react-icons/go";

export function LoginBox(){
    return (
        <>
            <div className={styles.wrapperLoginBox}>
                <h3>
                    Envie e compartilhe sua mensagem
                </h3>
                <button type='button' className={styles.buttonLogin}>
                    <GoMarkGithub className={styles.icon}/>
                    entrar com Github
                </button>
            </div>
        </>
    )
}