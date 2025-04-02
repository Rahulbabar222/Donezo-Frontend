import { configureStore } from "@reduxjs/toolkit";
import pomodoroReducer from "./slice/pomodoroSlice";

export const store = configureStore({
    reducer: {
        pomodoro: pomodoroReducer,
    },
});

export default store;