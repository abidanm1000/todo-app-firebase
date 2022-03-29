import React from 'react'
import TaskInput from '../components/TaskInput';
import TaskList from '../components/TaskList';
import { useState, useEffect } from 'react';
import { onSnapshot, collection, doc, deleteDoc, setDoc } from 'firebase/firestore'
import db from '../utils/firebase'
import { auth } from '../utils/firebase'
import { signOut } from 'firebase/auth'

export const Dashboard = () => {
    const [tasks, setTasks] = useState([])
    const [filteredTasks, setFilteredTasks] = useState(tasks)
    const [filterStatus, setFilterStatus] = useState('all')
    const [theme, setTheme] = useState('')
    const [user, setUser] = useState({})

    // activates light mode when switchTheme runs on click
    let switchTheme = () => theme === '' ? setTheme('lightMode') : setTheme('');

    // changes sun icon when in light mode
    let switchIcon = theme === '' ? '/images/icon-sun.svg' : '/images/icon-moon.svg';

    // fetching firebase data inside useEffect and filtering
    useEffect(()=> {
        // how do i check if the use is logged in or authenticated?
        auth.onAuthStateChanged(currentUser => {
            if(currentUser) {
                // keep track of that user
                // console.log(currentUser.uid)
                setUser(currentUser.uid)
            } else {
                console.log('ERROR PLEASE SIGN IN FIRST')
                window.location = '/'
            }
        })

        // grab the users tasks
        // onSnapshot is constantly listening for changes in firebase
        const unsub = onSnapshot(doc(db, 'users', `${user}`), (snapshot) => {
            let todos = snapshot.data().tasks
            // setFilteredTasks(todos)

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

        // clean up function makes onSnapshot stop listening for changes
        return unsub
    }, [user, filterStatus])


    // useEffect(()=> {
    //     // gets data and listens for an update/change
    //     const unsub = onSnapshot(collection(db, 'tasks'), (snapshot)=> { // getData() - works too but we have to call this everytime we need data
    //     let todos = snapshot.docs.map(doc => ({...doc.data(), id: doc.id}) )
    //     // setFilteredTasks(todos)
    //     console.log(todos)
    //     const handleFilter = () => {
    //         if(filterStatus === 'active') {
    //             setFilteredTasks(todos.filter(task => task.completed === false))
    //         }
    //         else if(filterStatus === 'completed') {
    //             setFilteredTasks(todos.filter(task => task.completed === true))
    
    //         } else {
    //             setFilteredTasks(todos)
    //         }
    //     }
    
    //     handleFilter()
    //     })

    //     // Clean up function when the components unmounts remove the sideEffect
    //     return unsub

    // }, [filterStatus])


    // deleting docs with firebase - need to set to new doc in order to delete
    let clearCompleted = () => {
        let newTodos = filteredTasks.filter(item => !item.completed)

        const payload = {
            tasks: newTodos
          }
    
        setDoc(doc(db, 'users', user), payload)
        setFilterStatus('all')
    }

    const logout = async () => {
        await signOut(auth)
        window.location = '/'
    }
  

  return (
    <div className={`Dashboard ${theme}`}>
        <div className='container'>

            <div className='header'>
                <h1>TODO</h1>
                <img src={switchIcon} onClick={switchTheme} alt='switch icon'></img>
                <h3 className='logout' onClick={logout}>Logout</h3>
            </div>

            <TaskInput tasks={tasks} setTasks={setTasks} theme={theme} userId={user} filteredTasks={filteredTasks}/>

            <TaskList 
                tasks={tasks} 
                setTasks={setTasks} 
                filterStatus={filterStatus} 
                setFilterStatus={setFilterStatus} 
                filteredTasks={filteredTasks}
                setFilteredTasks={setFilteredTasks} 
                clearCompleted={clearCompleted}
                theme={theme}
                userId={user}
            />
        </div>
        
    </div>
  )
}
