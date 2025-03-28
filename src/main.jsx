import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { TodoProvider } from './context/TodoContext.jsx'
import { UiProvider } from './context/UiContext.jsx'
import { PomodoroProvider } from './context/PomodoroContext.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <UiProvider>
            <TodoProvider>
                <PomodoroProvider>
                <App />
                </PomodoroProvider>
            </TodoProvider>
        </UiProvider>
    </StrictMode>,
)
