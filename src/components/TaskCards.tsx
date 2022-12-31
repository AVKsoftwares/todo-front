import React from "react"

import TaskCard from './TaskCard';

function TaskCards({ tasks, setTasks }) {
    return (
        <div className='list_container'>
            <div className='list_column'>
                <h2>To Do</h2>
                <div className='list_tasks_container'>
                    {tasks.filter(task => task.status.includes('todo')).map(task => (
                        <TaskCard key={task._id} task={task} setTasks={setTasks} tasks={tasks}></TaskCard>
                    ))}
                </div>
            </div>
            <div className='list_column'>
                <h2>Current</h2>
                <div className='list_tasks_container'>
                    {tasks.filter(task => task.status.includes('current')).map(task => (
                        <TaskCard key={task._id} task={task} setTasks={setTasks} tasks={tasks}></TaskCard>
                    ))}
                </div>
            </div>
            <div className='list_column'>
                <h2>Done</h2>
                <div className='list_tasks_container'>
                    {tasks.filter(task => task.status.includes('done')).map(task => (
                        <TaskCard key={task._id} task={task} setTasks={setTasks} tasks={tasks}></TaskCard>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TaskCards
