import React, { useState } from 'react';
import HomePage from './Homepage';
import TaskForm from './Taskform';

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <div className="h-[100vh]">
      <header className="flex p-8">
        <h1 className='text-white mx-auto p-4 m-2 text-[2rem] text-center flex items-center justify-center rounded-[1.5rem] shadow-violet-300 shadow-xl bg-gradient-to-br from-blue-400 to-purple-400'>Task Management</h1>
      </header>
      <main className="flex gap-10 px-12 lg:flex-row flex-col">
        <TaskForm onAddTask={addTask} />
        <HomePage tasks={tasks} onDeleteTask={deleteTask} setTasks={setTasks}/>
      </main>
    </div>
  );
}

export default App;
