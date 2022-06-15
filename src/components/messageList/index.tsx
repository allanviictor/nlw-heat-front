import styles from './Style.module.sass'
import logo from '../../assets/ic-dowhile.png'
import { api } from '../../api/api'
import { useEffect, useState } from 'react'

type Messages = {
    text: string
    id: string
    user: {
        name: string
        avatar_url: string
    }
}

export function MessageList() {

    const [messages, setMessages] = useState<Messages[]>([])

    useEffect(() => {
        getMessages()
    }, [])

    async function getMessages() {
        await api.get<Messages[]>('/last/messages').then(response => {

            setMessages(response.data)
        })

    }


    return (
        <>
            <div className={styles.wrapperMessageList}>
                <img className="logo" src={logo} alt="" />
                <ul>
                    {
                        messages.map(item => {
                            return (
                                <li key={item.id}>
                                    {item.text}
                                    <div className={styles.userAvatar}>
                                        <div className={styles.borderGradient}>
                                            <img src={item.user.avatar_url} alt="" />
                                        </div>
                                        {item.user.name}
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </>
    )
}