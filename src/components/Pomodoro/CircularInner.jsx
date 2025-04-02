import React from 'react'
import { useSelector } from "react-redux";

const CircularInner = () => {
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes < 10 ? "0" : ""}${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };

    const {
        sessions,
        mode, sessionLeft, timeLeft
    } = useSelector((state) => state.pomodoro);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
                    {mode === "pomodoro" ?
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#ffffff" fill="none">
                            <path d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#ffffff" fill="none">
                            <path d="M18.2505 10.5H19.6403C21.4918 10.5 22.0421 10.7655 21.9975 12.0838C21.9237 14.2674 20.939 16.8047 17 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M5.94627 20.6145C2.57185 18.02 2.07468 14.3401 2.00143 10.5001C1.96979 8.8413 2.45126 8.5 4.65919 8.5H15.3408C17.5487 8.5 18.0302 8.8413 17.9986 10.5001C17.9253 14.3401 17.4281 18.02 14.0537 20.6145C13.0934 21.3528 12.2831 21.5 10.9194 21.5H9.08064C7.71686 21.5 6.90658 21.3528 5.94627 20.6145Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M11.3089 2.5C10.7622 2.83861 10.0012 4 10.0012 5.5M7.53971 4C7.53971 4 7 4.5 7 5.5M14.0012 4C13.7279 4.1693 13.5 5 13.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    }
                    <p className="text-8xl text-[#dce0fe] my-5">{formatTime(timeLeft)}</p>
                    <div className="flex gap-2 my-5">
                        {Array.from({ length: sessions }).map((_, index) => (
                            <div
                                key={index}
                                className={`w-2 h-3 rounded-4xl ${(sessions - sessionLeft) > index ? "bg-red-800" : "bg-black"}`}
                            ></div>
                        ))}
                    </div>
                    <p className="text-xl text-zinc-300">
                        {mode === "pomodoro" ? "FOCUS" : ""}
                        {mode === "short" ? "BREAK" : ""}
                        {mode === "long" ? "BREAK" : ""}
                    </p>
                </div>
  )
}

export default CircularInner