import React from 'react'
import TaskInput from '../components/TaskInput';
import TaskList from '../components/TaskList';
import { useState, useEffect } from 'react';
import { onSnapshot, collection, doc, deleteDoc } from 'firebase/firestore'
import db from '../utils/firebase'

export const Dashboard = () => {
    const [tasks, setTasks] = useState([])
    const [filteredTasks, setFilteredTasks] = useState(tasks)
    const [filterStatus, setFilterStatus] = useState('all')
    const [theme, setTheme] = useState('')


    // activates light mode when switchTheme runs on click
    let switchTheme = () => theme === '' ? setTheme('lightMode') : setTheme('');

    // changes sun icon when in light mode
    let switchIcon = theme === '' ? '/images/icon-sun.svg' : '/images/icon-moon.svg';

    // fetching firebase data inside useEffect and filtering
    useEffect(()=> {
        // gets data and listens for an update/change
        const unsub = onSnapshot(collection(db, 'tasks'), (snapshot)=> { // getData() - works too but we have to call this everytime we need data
        let todos = snapshot.docs.map(doc => ({...doc.data(), id: doc.id}) )
        // setFilteredTasks(todos)
        console.log(todos)
        const handleFilter = () => {
            if(filterStatus === 'active') {
                setFilteredTasks(todos.filter(task => task.completed === false))
            }
            else if(filterStatus === 'completed') {
                setFilteredTasks(todos.filter(task => task.completed === true))
    
            } else {
                setFilteredTasks(todos)
            }
        }
    
        handleFilter()
        })

        // Clean up function when the components unmounts remove the sideEffect
        return unsub

    }, [filterStatus])


    // deleting docs with firebase
    let clearCompleted = () => {
        filteredTasks.forEach(item => item.completed ? deleteDoc(doc(db, 'tasks', item.id)) : item)
        setFilterStatus('all')
    }

  return (
    <div className={`Dashboard ${theme}`}>
        <div className='container'>

            <div className='header'>
                <h1>TODO</h1>
                <img src={switchIcon} onClick={switchTheme} alt='switch icon'></img>
            </div>

            <TaskInput tasks={tasks} setTasks={setTasks} theme={theme}/>

            <TaskList 
                tasks={tasks} 
                setTasks={setTasks} 
                filterStatus={filterStatus} 
                setFilterStatus={setFilterStatus} 
                filteredTasks={filteredTasks}
                setFilteredTasks={setFilteredTasks} 
                clearCompleted={clearCompleted}
                theme={theme}
            />
        </div>
    </div>
  )
}
