import React, { useContext, useEffect, useState,useRef } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { TodoContext } from "../context/TodoContext";
// import { data } from "react-router-dom";

const ToDoCalendar = () => {
    const {selectedDate, setSelectedDate,setFilter,filter}= useContext(TodoContext)
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);


    const handleDateChange = (date) => {
        const newDate=date.getFullYear() + "-" + 
        String(date.getMonth() + 1).padStart(2, '0') + "-" + 
        String(date.getDate()).padStart(2, '0'); 
        setSelectedDate(newDate);
        setFilter(newDate)
    };

    useEffect(() => {
      if (selectedDate){
        setIsOpen(false)
      }
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [selectedDate])
    

    return (
        <>
            <div className="relative inline-block text-left" ref={dropdownRef}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`flex items-center px-2 py-1 m-2 gap-2 rounded-full ${isOpen || filter===selectedDate ? "bg-gray-600" : ""}`}>
                        
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" className={`${isOpen || filter===selectedDate ? "text-white" : "text-gray-600"}`} fill="none">
                        <path d="M18 2V4M6 2V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M11.9955 13H12.0045M11.9955 17H12.0045M15.991 13H16M8 13H8.00897M8 17H8.00897" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3.5 8H20.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2.5 12.2432C2.5 7.88594 2.5 5.70728 3.75212 4.35364C5.00424 3 7.01949 3 11.05 3H12.95C16.9805 3 18.9958 3 20.2479 4.35364C21.5 5.70728 21.5 7.88594 21.5 12.2432V12.7568C21.5 17.1141 21.5 19.2927 20.2479 20.6464C18.9958 22 16.9805 22 12.95 22H11.05C7.01949 22 5.00424 22 3.75212 20.6464C2.5 19.2927 2.5 17.1141 2.5 12.7568V12.2432Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3 8H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                {isOpen && <div className="calendar-container absolute top-10 z-100">
                    <Calendar onChange={handleDateChange} value={selectedDate} />
                </div>}
            </div>
        </>
    );
};

export default ToDoCalendar;