import { createSlice } from "@reduxjs/toolkit";

const initialState={
    sessions: 4,
    pomodoroTime: 1500,  // 25 minutes
    shortBreakTime: 300,  // 5 minutes
    longBreakTime: 900,  // 15 minutes
    autoStart: false,
    longactivate: 4,
    mode: "pomodoro",
    sessionLeft: 4,
    timeLeft: 1500,
    isRunning: false,
};

const pomodoroSlice = createSlice({
    name: "pomodoro",
    initialState,
    reducers: {
        setMode: (state, action) => {
            state.mode = action.payload;
            if (state.mode === "pomodoro") state.timeLeft = state.pomodoroTime;
            else if (state.mode === "short") state.timeLeft = state.shortBreakTime;
            else if (state.mode === "long") state.timeLeft = state.longBreakTime;
        },
        setTimeLeft: (state, action) => {
            state.timeLeft = action.payload;
        },
        setSessionLeft: (state, action) => {
            state.sessionLeft = action.payload;
        },
        toggleRunning: (state) => {
            state.isRunning = !state.isRunning;
        },
        reset: (state) => {
            state.isRunning = false;
            state.mode = "pomodoro";
            state.timeLeft = state.pomodoroTime;
            state.sessionLeft = state.sessions;
        },
        setPomodoroTime: (state,action)=>{
            state.pomodoroTime =action.payload;
        },
        setShortBreakTime: (state,action)=>{
            state.shortBreakTime =action.payload;
        },
        setLongBreakTime: (state,action)=>{
            state.longBreakTime =action.payload;
        },
        setLongactivate: (state,action)=>{
            state.longactivate =action.payload;
        },
        setSessions: (state,action)=>{
            state.sessions =action.payload;
        },
        toggleAutoStart: (state,action)=>{
            state.autoStart = !state.autoStart
        }
    },
});

export const { setMode, setTimeLeft, setSessionLeft, toggleRunning, reset,
    setPomodoroTime,setLongBreakTime,setShortBreakTime,setLongactivate,setSessions,toggleAutoStart } = pomodoroSlice.actions;
export default pomodoroSlice.reducer;