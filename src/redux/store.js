import { configureStore } from "@reduxjs/toolkit";
import pomodoroReducer from "./slice/pomodoroSlice";
import todoReducer from "./slice/todoSlice";

export const store = configureStore({
    reducer: {
        pomodoro: pomodoroReducer,
        todo:todoReducer,
    },
});

export default store;