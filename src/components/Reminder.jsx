import React, { useContext, useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { TodoContext } from "../context/TodoContext";

const Reminder = ({}) => {
    const {reminder, setReminder,isreminderopen, setisreminderopen}=useContext(TodoContext)
    
    useEffect(() => {
        console.log(reminder)
    }, [reminder])

    return (
        <>
            <div className="relative inline-block text-left">
                <button
                    onClick={() => setisreminderopen(!isreminderopen)}
                    className={`flex items-center px-2 py-1 m-2 gap-2 rounded-full border-1 border-gray-600 ${isreminderopen ? "bg-gray-600" : ""}`}>
                    <p className={`text-sm ${isreminderopen ? "text-white" : ""}`} >Reminder</p>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" className={`${isreminderopen ? "text-white" : "text-gray-600"}`} fill="none">  
                    <path d="M21 17.5H3C4.50991 16.896 5.5 15.4336 5.5 13.8074V9C5.5 5.41015 8.41015 2.5 12 2.5C15.5899 2.5 18.5 5.41015 18.5 9V13.8074C18.5 15.4336 19.4901 16.896 21 17.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M14.5 20.5C13.8557 21.1186 12.9733 21.5 12 21.5C11.0267 21.5 10.1443 21.1186 9.5 20.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>

                {isreminderopen && <div className="calendar-container absolute top-10">
                    <DateTimePicker
                onChange={setReminder}
                value={reminder}
                format="y-MM-dd h:mm a" 
                disableClock
            />
                </div>}
            </div>
        </>
    );
};

export default Reminder;