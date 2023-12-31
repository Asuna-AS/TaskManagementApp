import React, { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'high',
    completed: false
  });

  const addTask = () => {
    onAddTask(newTask);
    setNewTask({
      title: '',
      description: '',
      dueDate: '',
      priority: 'high',
      completed: false
    });
  };

  return (
      <div className="flex flex-col gap-4 w-8/12 mx-auto lg:w-1/3">
        <div className='text-center poppins text-3xl text-indigo-300 py-4'>Have something on your mind?</div>
      <input
        className="p-4 border-indigo-300 border-2 shadow-xl shadow-indigo-100 rounded-[3rem]"
        type="text"
        placeholder="Task Title"
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        required
      />
      <input
        className="p-4 border-indigo-300 border-2 shadow-xl shadow-indigo-100 rounded-[3rem]"
        type="text"
        placeholder="Task Description"
        value={newTask.description}
        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        required
      />
      <input
        className="p-4 border-indigo-300 border-2 shadow-xl shadow-indigo-100 rounded-[3rem]"
        type="date"
        value={newTask.dueDate}
        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
        required
      />
      <select
        className="p-4 border-indigo-300 border-2 shadow-xl shadow-indigo-100 rounded-[3rem]"
        value={newTask.priority}
        onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
        required
      >
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <button className="p-4 mx-auto border-blue-600 border-2 shadow-xl shadow-indigo-100 ease-in-out transition-all hover:bg-blue-100 w-44" onClick={addTask}>Add Task</button>
    </div>
  );
};

export default TaskForm;
