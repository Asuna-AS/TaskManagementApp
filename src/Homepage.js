// HomePage.js
import React, { useState } from 'react';

const HomePage = ({ tasks, onDeleteTask, setTasks }) => {
  const [filterBy, setFilterBy] = useState('all'); // 'all', 'high', 'medium', 'low'
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState(null); // null, 'title', 'description', 'dueDate', 'priority'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc', 'desc'
  const [completedFilter, setCompletedFilter] = useState('all'); // 'all', 'completed', 'not-completed'
  const [dateFilter, setDateFilter] = useState('all'); // 'all', 'upcoming', 'overdue'
  const [checkComplete, setComplete] = useState(false);

  const sortTasks = (criteria) => {
    if (sortBy === criteria) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(criteria);
      setSortOrder('asc');
    }
  };

  const filteredTasks = () => {
    return tasks
      .filter((task) => {
        if (filterBy === 'all') return true;
        return task.priority === filterBy;
      })
      .filter((task) => {
        if (completedFilter === 'all') return true;
        return task.completed === (completedFilter === 'completed');
      })
      .filter((task) => {
        if (dateFilter === 'all') return true;

        const currentDate = new Date();
        const dueDate = new Date(task.dueDate);

        if (dateFilter === 'upcoming') {
          return dueDate > currentDate;
        } else if (dateFilter === 'overdue') {
          return dueDate < currentDate;
        }

        return true;
      })
      .filter((task) => task.title.toLowerCase().includes(searchTerm.toLowerCase()));
  };

  const markTaskComplete = (index) => {
    setTasks((tasks) => {
      const updatedTasks = tasks.map((task, ind) =>
        ind === index ? { ...task, completed: !task.completed } : task
      );
      return updatedTasks;
    });
    console.log("Marked task: " + index);
  };

  return (
    <div className="flex flex-col rounded-[2rem] px-4 w-full bg-indigo-100">
      <div className="py-2 text-xl my-4 text-center">All Tasks</div>
      <div className="mb-4 flex flex-col lg:gap-4 lg:flex-row">
        <label className="flex my-auto py-2">Filter by:</label>
        <select
          className="p-2 border border-gray-300 rounded-[3rem]"
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
        >
          <option value="all">All</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>
        <label className="flex my-auto py-2">Completed:</label>
        <select
          className="p-2 border border-gray-300 rounded-[3rem]"
          value={completedFilter}
          onChange={(e) => setCompletedFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="not-completed">Not Completed</option>
        </select>
        <label className="flex my-auto py-2">Due Date:</label>
        <select
          className="p-2 border border-gray-300 rounded-[3rem]"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="upcoming">Upcoming</option>
          <option value="overdue">Overdue</option>
        </select>
        <label className="flex my-auto py-2">Search:</label>
        <input
          type="text"
          className="p-2 border border-gray-300 rounded-[3rem]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto mb-8">
          <thead>
            <tr className="text-center bg-blue-200 border border-blue-300">
              <th className="w-1/7 p-4"></th>
              <th className="w-1/7 p-4" onClick={() => sortTasks('title')}>
                Title {sortBy === 'title' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th className="w-1/7 p-4" onClick={() => sortTasks('description')}>
                Description {sortBy === 'description' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th className="w-1/7 p-4" onClick={() => sortTasks('dueDate')}>
                Due Date {sortBy === 'dueDate' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th className="w-1/7 p-4" onClick={() => sortTasks('priority')}>
                Priority {sortBy === 'priority' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th className="w-1/7 p-4">Actions</th>
              <th className="w-1/7 p-4">Status</th>
              <th className="w-1/7 p-4"></th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks().map((task, index) => (
              <tr key={index} className={`text-center ${task.completed ? 'bg-green-100' : 'bg-white'} shadow-md border border-blue-300`}>
                <td className="p-2 text-center">{index + 1}</td>
                <td className="p-2">{task.title}</td>
                <td className="p-2">{task.description}</td>
                <td className="p-2">{task.dueDate}</td>
                <td className="p-2">{task.priority}</td>
                <td className="p-2">
                  {task.completed ? (
                    <span className="text-green-400">Completed</span>
                  ) : (
                    <span className="text-red-400">Incomplete</span>
                  )}
                </td>
                <td className="p-2">
                  {task.completed ? (
                    <button
                      className="px-3 py-1 w-48 bg-blue-500 text-white rounded"
                      onClick={() => markTaskComplete(index)}
                    >
                      Mark Incomplete
                    </button>
                  ) : (
                    <button
                      className="px-3 py-1 w-48 bg-green-500 text-white rounded"
                      onClick={() => markTaskComplete(index)}
                    >
                      Mark Complete
                    </button>
                  )}
                </td>
                <td className="p-2">
                  <button onClick={() => onDeleteTask(index)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" id="delete"><path fill="red" d="M15 3a1 1 0 0 1 1 1h2a1 1 0 1 1 0 2H6a1 1 0 0 1 0-2h2a1 1 0 0 1 1-1h6Z"/><path fill="red" fill-rule="evenodd" d="M6 7h12v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7Zm3.5 2a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 1 0v-9a.5.5 0 0 0-.5-.5Zm5 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 1 0v-9a.5.5 0 0 0-.5-.5Z" clip-rule="evenodd"/></svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomePage;
