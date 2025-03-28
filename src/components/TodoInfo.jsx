import React, { useState, useRef, useEffect } from 'react'

const TodoInfo = ({ task }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const date = new Date(task.createdAt).toLocaleString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric", 
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,  
        timeZone: userTimeZone 
    }).replace(",", "");
   
    useEffect(() => {
        const handleInfo = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleInfo);
        return () => document.removeEventListener("mousedown", handleInfo);
    }, []);

    return (

        <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" color="#000000" fill="none" className='mt-2 ml-1'>
                    <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M12.2422 17V12C12.2422 11.5286 12.2422 11.2929 12.0957 11.1464C11.9493 11 11.7136 11 11.2422 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M11.992 8H12.001" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {isOpen && (
                <div className='absolute right-0 mt-2 w-50 text-sm bg-white border-none z-10 rounded-lg shadow-md p-2'>
                    <p>Created on- {date.split(",")[0]}</p>
                    <p>Time- {date.split(",")[1]}</p>
                </div>

            )}
        </div>

    )
}

export default TodoInfo