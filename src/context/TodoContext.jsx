import { createContext, useState, useEffect } from "react";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {

    const [todos, setTodos] = useState([])
    const [todo, setTodo] = useState("")
    const [filter, setFilter] = useState("all")
    const [editTodoId, setEditTodoId] = useState("")
    const [editText, setEditText] = useState("")
    const [label, setLabel] = useState("")
    const [labels, setLabels] = useState([])
    const [selectedLabel, setSelectedLabel] = useState(labels[0]);
    const [tempLabel, settempLabel] = useState("")
    const [filteredTodos, setFilteredTodos] = useState([]);
    const [reminder, setReminder] = useState(null);
    const [isreminderopen, setisreminderopen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [priority, setPriority] = useState("");
    const [ispriorityOpen, setIspriorityOpen] = useState(false);


    // Fetch Todos on Mount
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await fetch("http://localhost:3001/todos");
                const data = await response.json();
                setTodos(data);
            } catch (error) {
                console.error("Error fetching todos:", error);
            }
        };
        fetchTodos();
    }, []);


    useEffect(() => {
        let tempTodos = [...todos];
        if (filter === "active") {
            tempTodos = tempTodos.filter(todo => !todo.isCompleted );
        } else if (filter === "completed") {
            tempTodos = tempTodos.filter(todo => todo.isCompleted );
        } else if (filter === tempLabel) {
            tempTodos = tempTodos.filter(todo => todo.label === tempLabel );
        } else if (filter === selectedDate){
            tempTodos = tempTodos.filter(todo => {
                const todoDate = new Date(todo.createdAt); // Convert string to Date object
                const formattedTodoDate = todoDate.getFullYear() + "-" + 
                                          String(todoDate.getMonth() + 1).padStart(2, '0') + "-" + 
                                          String(todoDate.getDate()).padStart(2, '0');
                                          return formattedTodoDate === selectedDate;
                                        });

        } 
        tempTodos = tempTodos.sort((a, b) => a.isCompleted - b.isCompleted );
            
        setFilteredTodos(tempTodos);
        if (["all", tempLabel, "active", "completed"].includes(filter)) {
            setSelectedDate(null);
        }
    }, [todos, filter, tempLabel]);


    //Handling chnage in text Box
    const handleTodoChange = (e) => {
        setTodo(e.target.value)
    };

    //Add button
    const handleAdd = async () => {
        const addSound= new Audio("/Todoadded.mp3")
        addSound.play();

        const response = await fetch("http://localhost:3001/todos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ todo: todo, label: selectedLabel, reminder:reminder ,priority:priority}),
        });

        const newTodo = await response.json();
        console.log(newTodo)
        setTodos([...todos, newTodo]); // Update state
        setTodo(""); // Clear input
        setSelectedLabel("")
        setisreminderopen(false)
        setReminder(null)
        setPriority("")
    };

    //Delete Button
    const handleDelete = async (id) => {
        
        const confirmDelete = window.confirm("Are you sure you want to delete this todo?");
        if (!confirmDelete) return;

        const deleteSound= new Audio("/Delete.mp3")
        deleteSound.play();

        await fetch(`http://localhost:3001/todos/${id}`, { method: "DELETE" });
        setTodos(todos.filter((t) => t._id !== id));
    };

    //Checkbox Handling
    const handleCheckbox = async (e) => {
        const checkSound= new Audio("/Check.mp3");
        checkSound.play();

        const uid = e.target.name;
        const updatedTodos = todos.map(todo =>
            todo._id === uid ? { ...todo, isCompleted: !todo.isCompleted } : todo
        );

        setTodos(updatedTodos); // Update UI

        // Find the updated todo item
        const updatedTodo = updatedTodos.find(todo => todo._id === uid);

        try {
            // Send update to backend
            await fetch(`http://localhost:3001/todos/${uid}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isCompleted: updatedTodo.isCompleted }),
            });
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    };

    //Edit button
    const handleEditClick = (task) => {
        setEditTodoId(task._id);
        setEditText(task.todo);
        // setReminder(task.reminder);
        setPriority(task.priority);
        setSelectedLabel(task.label);
    }

    //Cancel button
    const handleCancelClick = () => {
        setEditTodoId("")
        setEditText("")
        setReminder(null)
        setSelectedLabel("");
        setisreminderopen(false);
        setIspriorityOpen(false);
        setPriority("")
    }

    

    //Save Buttton
    const handleSave = async (uid) => {
        const confirmSave = window.confirm("Do you want to save new changes?");
        if (!confirmSave) {
            setEditTodoId("");
            return;

        } else {
            let saveAudio= new Audio("/Save.mp3")
            saveAudio.play()
            setTodos(prevTodos =>
                prevTodos.map(todo =>
                    todo._id === uid ? { ...todo, todo: editText,label:selectedLabel, reminder:reminder, priority:priority} : todo
                )
            );
            setEditTodoId("");
            setSelectedLabel("");
            setReminder(null);
            setisreminderopen(false);
            setIspriorityOpen(false);
            setPriority("")


            try {
                // Send update to backend
                await fetch(`http://localhost:3001/todos/${uid}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ todo: editText, label:selectedLabel, reminder:reminder ,priority:priority}),
                });
            } catch (error) {
                console.error("Error updating todo:", error);
            }
        }
    };

    // Fetch labels on Mount
    useEffect(() => {
        const fetchLabels = async () => {
            try {
                const response = await fetch("http://localhost:3001/labels");
                const data = await response.json();
                setLabels(data);
            } catch (error) {
                console.error("Error fetching todos:", error);
            }
        };
        fetchLabels();
    }, []);

    //label text box
    const handleLabelChange = (e) => {
        setLabel(e.target.value)
    }

    const handleLabelAdd = async () => {
        if (labels.some((l) => l.label === label)) {  // Check label inside the object
            setLabel("");
            const errorSound= new Audio("/Error.mp3")
            errorSound.play();
            console.log("Label already exists.");
            return;
        }
        try {
            const response = await fetch("http://localhost:3001/labels", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ label }),
            });

            if (!response.ok) throw new Error("Failed to create label");

            const newLabel = await response.json();
            const addSound= new Audio("/Todoadded.mp3")
            addSound.play();
            setLabels([...labels, newLabel]); // Ensure only label string is stored
            setLabel(""); // Clear input
        } catch (error) {
            console.error("Error adding label:", error);
        }
    };

    const handleLabelDelete = async (id, deletelabel) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete this label?`);
        if (!confirmDelete) return;
    
        if (todos.some((todo) => todo.label === deletelabel)) {
            const confirmUnlabel = window.confirm(
                `Deleting "${deletelabel}" will remove this label from all related tasks. Proceed?`
            );
            if (!confirmUnlabel) return;
        }
    
        console.log("Deleting label with ID:", id);
        const deleteSound= new Audio("/Delete.mp3")
        deleteSound.play();
    
        if (todos.some((todo) => todo.label === deletelabel)) {
            let updatedTodo = todos.map(todo => 
                todo.label === deletelabel ? { ...todo, label: "" } : todo
            );
    
            console.log("Updated todos payload:", updatedTodo);
    
            try {
                // ✅ Update todos before deleting the label
                let updateResponse = await fetch(`http://localhost:3001/todos`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ todos: updatedTodo }),
                });
    
                if (!updateResponse.ok) {
                    throw new Error("Failed to update todos");
                }
            } catch (error) {
                console.error("Error updating label:", error);
                alert("Failed to update todos. Label deletion canceled.");
                return; // Stop execution if update fails
            }
        }
    
        try {
            // ✅ Delete the label only after todos are updated
            let labelResponse = await fetch(`http://localhost:3001/labels/${id}`, { method: "DELETE" });
    
            if (!labelResponse.ok) {
                throw new Error("Failed to delete label");
            }
    
            setLabels(labels.filter((t) => t._id !== id));
            setFilter("all");
        } catch (error) {
            console.error("Error deleting label:", error);
            alert("Failed to delete label.");
        }
    };
    

    return (
        <TodoContext.Provider value={{
        setFilter,filteredTodos,handleCheckbox, editTodoId, editText, 
        handleEditClick,handleCancelClick, setEditText, handleDelete, handleSave, filter,
        handleLabelChange,label,handleLabelAdd,labels,settempLabel,handleLabelDelete,
        selectedLabel,setSelectedLabel,handleTodoChange,todo,handleAdd,tempLabel,reminder, setReminder,
        isreminderopen, setisreminderopen,selectedDate, setSelectedDate,priority, setPriority,
        ispriorityOpen, setIspriorityOpen}}>
            {children}
        </TodoContext.Provider>
    );
};