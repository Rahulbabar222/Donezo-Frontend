import React, { useContext } from 'react'
import { TodoContext } from '../context/TodoContext'
import LabelDropdown from './LabelDropdown'
import TodoInfo from './TodoInfo'
import ToDoCalendar from './ToDoCalender';
import { formatLocalDate } from '../utlis/DateUtil';
import Reminder from './Reminder';



const TodoList = ({ }) => {
    const { setFilter, filteredTodos, handleCheckbox, editTodoId, editText, handleEditClick, handleCancelClick, setEditText, handleDelete, handleSave, filter, tempLabel } = useContext(TodoContext)

    return (
        <>
            {/*View Buttons */}
            <div className="flex justify-center items-center gap-2 px-5">
                <ToDoCalendar />
                <button onClick={() => setFilter("all")} className={` px-4 hover:bg-gray-100 rounded-full ${filter === "all" ? "text-zinc-700 font-bold" : "text-zinc-400"}`}>All</button>
                <button onClick={() => setFilter("active")} className={` px-4 hover:bg-gray-100 rounded-full ${filter === "active" ? "text-zinc-700 font-bold" : "text-zinc-400"}`}>Active</button>
                <button onClick={() => setFilter("completed")} className={` px-4 hover:bg-gray-100 rounded-full ${filter === "completed" ? "text-zinc-700 font-bold" : "text-zinc-400"}`}>Completed</button>
            </div>

            <div className="tasks bg-[#f1ece6] rounded-3xl sm:w-full h-[55vh] px-5 py-3 overflow-y-auto">

                {/* empty message */}
                {filteredTodos.length === 0 && (
                    <p className='text-zinc-400 text-xl text-center py-20'>
                        {filter === "all"
                            ? "All clear! Ready to conquer your next task?"
                            : filter === "active"
                                ? "No pending tasks! Time to relax or add new ones."
                                : filter === "completed"
                                    ? "Finish strong! Mark tasks as done to see them here."
                                    : filter === tempLabel
                                        ? `Nothing here yet! Add a new task to get started.`
                                        : ""}
                    </p>
                )}

                {/* Todo List*/}
                {filteredTodos.map(task => (

                    <div key={task._id} className='py-1 border-b-2 border-gray-300 w-full'>
                        <div className='flex justify-between'>
                            <div className="flex items-center text-sm gap-2 w-8/10 sm:w-9/10">
                                <input name={task._id} onChange={handleCheckbox} type="checkbox" checked={task.isCompleted} className="cursor-pointer" />


                                {/* Show input field if editing, otherwise show text */}
                                {editTodoId === task._id ? (
                                    <input
                                        type="text"
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                        className="border w-full border-amber-400 text-zinc-500 px-2 py-1 rounded"
                                    />
                                ) : (

                                    <p className={`text-zinc-600 ${task.isCompleted ? "line-through" : ""}`}>
                                        {task.todo}
                                    </p>
                                )}

                            </div>
                            <div className="flex justify-evenly min-w-2/10 sm:min-w-1/10">
                                {/*Edit button// Save button appears when editing */}
                                {editTodoId === task._id ? (
                                    // savebutton
                                    <div className='flex'>
                                        <button onClick={() => handleSave(task._id)} className={`py-2 pl-1 rounded-full cursor-pointer hover:bg-gray-100 `}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" color="#000000" fill="none">
                                                <path d="M3 13.3333C3 13.3333 4.5 14 6.5 17C6.5 17 6.78485 16.5192 7.32133 15.7526M17 6C14.7085 7.14577 12.3119 9.55181 10.3879 11.8223" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M8 13.3333C8 13.3333 9.5 14 11.5 17C11.5 17 17 8.5 22 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>

                                    </div>
                                ) : (
                                    // edit button
                                    <button onClick={() => handleEditClick(task)} className={`p-2 rounded-full  hover:bg-gray-100 ${task.isCompleted ? "cursor-not-allowed" : " cursor-pointer"}`} disabled={task.isCompleted}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" className={` ${task.isCompleted ? "text-red-500 cursor-not-allowed" : "text-gray-700"} `}>
                                            <path d="M14.0737 3.88545C14.8189 3.07808 15.1915 2.6744 15.5874 2.43893C16.5427 1.87076 17.7191 1.85309 18.6904 2.39232C19.0929 2.6158 19.4769 3.00812 20.245 3.79276C21.0131 4.5774 21.3972 4.96972 21.6159 5.38093C22.1438 6.37312 22.1265 7.57479 21.5703 8.5507C21.3398 8.95516 20.9446 9.33578 20.1543 10.097L10.7506 19.1543C9.25288 20.5969 8.504 21.3182 7.56806 21.6837C6.63212 22.0493 5.6032 22.0224 3.54536 21.9686L3.26538 21.9613C2.63891 21.9449 2.32567 21.9367 2.14359 21.73C1.9615 21.5234 1.98636 21.2043 2.03608 20.5662L2.06308 20.2197C2.20301 18.4235 2.27297 17.5255 2.62371 16.7182C2.97444 15.9109 3.57944 15.2555 4.78943 13.9445L14.0737 3.88545Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                            <path d="M13 4L20 11" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                            <path d="M14 22L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                )}

                                {editTodoId === task._id ? (
                                    // Cancel button
                                    <button onClick={() => handleCancelClick()} className={`py-2 pl-1 rounded-full cursor-pointer hover:bg-gray-100 `}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#000000" fill="none">
                                            <path d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>

                                ) : (
                                    //delete button 
                                    <button onClick={() => { handleDelete(task._id) }} className='delete p-2 rounded-full cursor-pointer hover:bg-gray-100'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#cf5e5e" fill="none">
                                        <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        <path d="M9.5 16.5L9.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        <path d="M14.5 16.5L14.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg></button>
                                )}

                                {/* info Button */}
                                <TodoInfo task={task} editTodoId={editTodoId} />

                            </div>
                        </div>

                        {editTodoId === task._id ? (
                            <div className='flex'>
                                <Reminder text={"text-xs"} color={"text-zinc-600"} size={"16"} />
                                <LabelDropdown text={"text-xs"} color={"text-zinc-600"} size={"16"} />
                            </div>
                        ) : (
                            <div className=' text-zinc-600 text-xs flex items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" className={` text-gray-600}`} fill="none">
                                    <path d="M21 17.5H3C4.50991 16.896 5.5 15.4336 5.5 13.8074V9C5.5 5.41015 8.41015 2.5 12 2.5C15.5899 2.5 18.5 5.41015 18.5 9V13.8074C18.5 15.4336 19.4901 16.896 21 17.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M14.5 20.5C13.8557 21.1186 12.9733 21.5 12 21.5C11.0267 21.5 10.1443 21.1186 9.5 20.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <p> - {task.reminder ? `${formatLocalDate(task.reminder).split(" 2025, ")[0]}, ${formatLocalDate(task.reminder).split(",")[1]}` : "No alert set"}</p>
                            </div>
                        )}

                    </div>



                ))}
            </div >
        </>
    )
}

export default TodoList