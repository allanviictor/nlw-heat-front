import styles from './Style.module.sass'
import logo from '../../assets/ic-dowhile.png'
import { api } from '../../api/api'
import { useEffect, useState } from 'react'
import io from "socket.io-client";

type Messages = {
    text: string
    id: string
    user_id:string 
    created_at:string
    user: {
        name: string
        avatar_url: string
    }
}

let messageQueue:Messages[] = []

const socket = io('http://localhost:3333')
socket.on('new_message',(message:Messages) => {
    messageQueue.push(message)
})


export function MessageList() {
    
    const [messages, setMessages] = useState<Messages[]>([])

    
    useEffect(()=> {
        setInterval(()=> {
            if(messageQueue.length > 0){
                setMessages(prevMessages=>[
                    messageQueue[0],
                    prevMessages[0],
                    prevMessages[1]
                ].filter(Boolean))

                messageQueue.shift()
            }
        },3000)
    },[])


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