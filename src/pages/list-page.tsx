import React, { useState, useEffect } from 'react'

import axios from 'axios';

import { Box } from '@mui/system';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import Task from '../models/task';

import TaskCards from '../components/TaskCards';

import '../App.css';

function ListPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        status: "todo"
    });

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const getData = async () => {
        const { data } = await axios.get(`http://localhost:3001/tasks/`);
        setTasks(data);
    };

    useEffect(() => {
        getData();
    }, []);

    const handleSubmit = (e) => {
        axios.post('http://localhost:3001/tasks/add', newTask)
            .then((response) => {
                setTasks([...tasks, response.data])
                handleClose();
            })
            .catch((error) => {
                console.log(error);
            });
        e.preventDefault();
    };

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'white',
        borderRadius: '10px',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
        p: 4,
    };


    return (
        <div className="list_page">
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='list_add_card'>
                        <div className='list_add_card_form'>
                            <Box
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                                }}
                                autoComplete="off"
                                onSubmit={handleSubmit}
                            >
                                <div className='list_add_card_form_text'>
                                    <TextField
                                        variant="standard"
                                        label="Titre"
                                        required
                                        onChange={e => {
                                            setNewTask({
                                                ...newTask,
                                                title: e.target.value
                                            });
                                        }}
                                    />
                                    <TextField
                                        variant="standard"
                                        label="Description"
                                        onChange={e => {
                                            setNewTask({
                                                ...newTask,
                                                description: e.target.value
                                            });
                                        }}
                                    />
                                </div>

                                <div className='list_add_card_form_radio'>
                                    <FormControl>
                                        <FormLabel id="demo-radio-buttons-group-label">Statut</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            value={newTask.status}
                                            onChange={e => {
                                                setNewTask({
                                                    ...newTask,
                                                    status: e.target.value
                                                });
                                            }}
                                            name="status">
                                            <FormControlLabel value="todo" control={<Radio />} label="To Do" />
                                            <FormControlLabel value="current" control={<Radio />} label="Current" />
                                            <FormControlLabel value="done" control={<Radio />} label="Done" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>

                                <div className='list_add_card_form_button'>
                                    <Button type="submit" variant="contained">Ajouter</Button>
                                </div>

                            </Box>

                        </div>
                    </div>
                </Box>
            </Modal>

            <TaskCards setTasks={setTasks} tasks={tasks} />

            <Box sx={{ '& > :not(style)': { marginBottom: '0', marginLeft: '90vw'} }}>
                <Fab className="fab" color="primary" aria-label="add" onClick={handleOpen}>
                    <AddIcon />
                </Fab>
            </Box>
        </div >
        
    );
}

export default ListPage