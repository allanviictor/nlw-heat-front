import styles from './App.module.sass'
import { LoginBox } from './components/loginBox'
import { MessageList } from './components/messageList'



function App() {
    

    return (
        <div className="App">
            <main className={styles.contentWrapper} >
                <MessageList/>
                <LoginBox/>
            </main>
        </div>
    )
}

export default App
