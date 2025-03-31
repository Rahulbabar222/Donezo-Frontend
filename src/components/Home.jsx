import { useContext } from 'react';
import TodoList from './TodoList';
import LabelDropdown from './LabelDropdown';
import LeftNav from './leftNav';
import { TodoContext } from "../context/TodoContext";
import { UiContext } from '../context/UiContext';
import Reminder from './Reminder';


function Home() {
    const { handleTodoChange, todo, handleAdd, editTodoId } = useContext(TodoContext)
    const { isSidebarOpen } = useContext(UiContext)

    return (
        <>
            <div className=' flex justify-evenly relative'>
                <LeftNav />
                <div className={`bg-[#fffbf6] rounded-3xl p-5 my-5 space-y-4 ${isSidebarOpen ? "hidden md:w-[65vw] md:block xl:w-[75vw]" : "w-[95vw]"} `}>

                    {/* title */}
                    <div className="title text-center">
                        <h1 className=' text-xl font-bold'>Donezo - Less Stress, More Donezo</h1>
                    </div>

                    {/* Add todo section */}
                    <div>
                        <div className="addToDo bg-[#f1ece6] rounded-full sm:w-full flex justify-between">
                            <input onChange={handleTodoChange} value={todo} required className='w-full focus:outline-none px-5 placeholder:text-sm text-zinc-500' type="text" name="todo" placeholder='What do you need to do?' />
                            <button onClick={handleAdd} disabled={!todo.trim()} className=' disabled:bg-gray-500 text-white rounded-r-full py-3 px-5 bg-[#76b7cd] hover:bg-[#8bc5da]'>ADD</button>

                        </div>

                        <div style={{ display: editTodoId ? "none" : "block" }}>
                            <div className='flex'>
                                <Reminder text={"text-sm"} color={"text-zinc-700"} size={"20"} />
                                <LabelDropdown text={"text-sm"} color={"text-zinc-700"} size={"20"} />
                            </div>
                        </div>

                    </div>
                    {/* Todos listing Section */}

                    <TodoList />

                </div>

            </div>
        </>
    )
}

export default Home
