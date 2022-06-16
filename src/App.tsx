import { useContext } from 'react'
import styles from './App.module.sass'
import { LoginBox } from './components/loginBox'
import { MessageList } from './components/messageList'
import { SendMessage } from './components/sendMessage'
import { authContext } from './context/auth'


function App() {
    const { user } = useContext(authContext)

    return (
        <div className="App">
            <main className={styles.contentWrapper} >
                <MessageList/>
                { !!user ? <SendMessage/> : <LoginBox/> }
                
            </main>
        </div>
    )
}

export default App
