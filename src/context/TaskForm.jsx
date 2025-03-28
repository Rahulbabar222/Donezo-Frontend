import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

const TaskForm = ({ addTask }) => {
  const [task, setTask] = useState("");
  const [dateTime, setDateTime] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      addTask({ text: task, dateTime });
      setTask("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        required
      />
      <DateTimePicker
        onChange={setDateTime}
        value={dateTime}
        format="y-MM-dd HH:mm"
        disableClock
      />
      <button type="submit">Add Task</button>
    </form>
  );
};