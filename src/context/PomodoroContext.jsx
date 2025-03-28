import { createContext, useState } from "react";

export const PomodoroContext = createContext();

export const PomodoroProvider = ({ children }) => {
    const [pomodoroTime, setPomodoroTime] = useState(25*60); //default 25mins
    const [shortBreakTime,setShortBreakTime] = useState(5*60);  //default 5mins
    const [longBreakTime, setLongBreakTime] = useState(15*60);//default 15mins
    const [sessions,setSessions] = useState(5) //default 5 sessions
    const [autoStart,setAutoStart]=useState(false);
    const [longactivate, setLongactivate] = useState(3)
    const [mode, setMode] = useState("pomodoro");
    const [sessionLeft, setSessionLeft] = useState(sessions);
    const [timeLeft, setTimeLeft] = useState(pomodoroTime);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes < 10 ? "0" : ""}${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };

  return (
     <PomodoroContext.Provider value={{
        pomodoroTime,setPomodoroTime,shortBreakTime,
        setShortBreakTime,longBreakTime,setLongBreakTime,
        sessions,setSessions,autoStart,
        setAutoStart,
        longactivate, setLongactivate,
        mode, setMode,
        sessionLeft, setSessionLeft,
        formatTime,timeLeft, setTimeLeft}}>
                {children}
            </PomodoroContext.Provider>
  )
}
