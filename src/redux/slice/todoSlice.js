import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos: [],
    todo: "",
    filter: "all",
    editTodoId: "",
    editText: "",
    label: "",
    labels: [],
    // selectedLabel: labels[0],
    tempLabel: "",
    filteredTodos: [],
    reminder: null,
    isreminderopen: false,
    selectedDate: null,
    priority: ""

}
const addSound = new Audio("/Todoadded.mp3")

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        //Handling Todos
        setTodo: (state, action) => {
            state.todo = action.payload;
        },

        addTodo: (state) => {
            if (state.todo.trim()) {
                state.todos.push(state.todo); // ✅ Correctly mutates state
                state.todo = ""; // Clears input
            }
        }

    }
})
export const { setTodo,addTodo } = todoSlice.actions;
export default todoSlice.reducer;