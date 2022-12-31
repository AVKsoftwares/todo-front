import React from "react"
import axios from 'axios'
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

function TaskCard({ task, tasks, setTasks }) {

    function setTaskStatus(newStatus) {
        setTasks(current =>
            current.map(selectedTask => {
                if (selectedTask._id === task._id) {
                    return { ...selectedTask, status: newStatus };
                }

                return selectedTask;
            }),
        );
    }


    function handleLeft() {
        var newStatus = '';
        (task.status === 'current') ?  newStatus = 'todo' : newStatus = 'current'

        axios.get(`http://localhost:3001/tasks/setStatus/${newStatus}/${task._id}`)
            .then((response) => {
                setTaskStatus(newStatus)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function handleRight() {
        var newStatus = '';
        (task.status === 'todo') ?  newStatus = 'current' : newStatus = 'done'
     
        axios.get(`http://localhost:3001/tasks/setStatus/${newStatus}/${task._id}`)
            .then((response) => {
                setTaskStatus(newStatus)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function handleClick() {
        axios.get(`http://localhost:3001/tasks/delete/${task._id}`)
            .then((response) => {
                setTasks(current =>
                    current.filter(obj => {
                      return obj._id !== task._id;
                    }),
                  );
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="list_card">
            <p className="list_card_title">{task.title}</p>
            {task.description ? <p className="list_card_description">{task.description}</p> : ''}
            <div className="list_card_buttons">
                <IconButton color="primary" onClick={handleLeft} disabled={task.status === 'todo' ? true : false}>
                    <KeyboardDoubleArrowLeftIcon />
                </IconButton>
                <IconButton color="primary" className="list_card_button" onClick={handleClick}>
                    <ClearIcon />
                </IconButton>
                <IconButton color="primary" onClick={handleRight} disabled={task.status === 'done' ? true : false}>
                    <KeyboardDoubleArrowRightIcon />
                </IconButton>
            </div>
        </div >
    )
}

export default TaskCard
