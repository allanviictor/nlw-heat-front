import { useContext, useState, FormEvent } from 'react'
import { authContext } from '../../context/auth'
import styles from './Styles.module.sass'
import { GoSignOut, GoMarkGithub } from 'react-icons/go'
import { api } from '../../api/api'


export function SendMessage() {
    let { user, signOut } = useContext(authContext)

    let [message,setMessage] = useState('')

    function handleSendMessage(event:FormEvent){
        event.preventDefault()

        if(!message.trim()){
            return false;
        }

        let headersAuth:Object ={
            headers:{
                authorization: "Bearer " + localStorage.getItem('nlwtoken')
            }
        }
        setMessage('')
        api.post('messages', { text: message }, headersAuth)
    }

    return (
        <div className={styles.sendMessageFormWrapper}>
            <button onClick={signOut} className={styles.signOutButton}>
                <GoSignOut size="32" />
            </button>

            <header className={styles.userInformation}>
                <div className={styles.userImage}>
                    <img src={user?.avatar_url} alt={user?.name} />
                </div>
                <strong className={styles.userName}>{user?.name}</strong>
                <span className={styles.userGithub}>
                    <GoMarkGithub size="16" />
                    {user?.login}
                </span>
            </header>

            <form onSubmit={handleSendMessage} className={styles.sendMessageForm}>
                <label htmlFor="message">Mensagem</label>

                <textarea
                    name="message"
                    id="message"
                    onChange={(e)=>setMessage(e.target.value) }
                    placeholder="Qual sua expectativa para o evento?"
                    value={message}

                />

                <button type="submit">Enviar mensagem</button>
            </form>
        </div>
    )
}