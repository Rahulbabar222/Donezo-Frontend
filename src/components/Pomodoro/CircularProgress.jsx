import React from "react";
import CircularInner from "./CircularInner";
import {useSelector } from "react-redux";

const CircularProgress = React.memo(({size = 370, strokeWidth = 10 }) => {
    const {
        pomodoroTime, shortBreakTime,
        longBreakTime,
        mode, timeLeft,
    } = useSelector((state) => state.pomodoro);

    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const totalTime= (mode === "pomodoro" ? pomodoroTime : mode === "short" ? shortBreakTime : longBreakTime)
    const progress = (timeLeft / totalTime) * 100;
    const offset = circumference + (progress / 100) * circumference;
   
    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="relative">
            {/* Background Circle */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#1e2140"
                strokeWidth={strokeWidth}
                fill="transparent"
            />
            {/* Progress Circle */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={mode === "pomodoro" ? "#c95250" : mode === "short" ? "#38868a" : "#397097"}
                strokeWidth={strokeWidth}
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={offset} // Use previous value for smoother transition
                strokeLinecap="round"
                transform={`rotate(-90 ${size / 2} ${size / 2})`} // Rotate to start from top
                style={{
                    transition: "stroke-dashoffset 1s linear",
                }}
            />
            {/* Time Left Text */}
            <foreignObject x="0" y="0" width={size} height={size}>
                <CircularInner/>
            </foreignObject>
        </svg>
    );
});

export default CircularProgress;