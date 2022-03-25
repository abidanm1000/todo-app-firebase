import React, {useState} from 'react'
import Check from '../images/icon-check.svg'
import {setDoc, doc, deleteDoc} from 'firebase/firestore'
import db from '../utils/firebase'

export const Task = ({ task, tasks, setTasks, theme, filteredTasks }) => {
  
  // create a state variable to keep track of mutable todos/tasks
  const [mutableTask, setMutableTask] = useState(task)
  
  const checked = mutableTask.completed ? 'checked' : '';
  const checkIcon = mutableTask.completed ? (<img src={Check} alt='completed' />) : '';

  // const markCompleted = () => {
  //   // console.log(task)
  //   // what should happen when I click?
  //   // update css to checked
   
    
  //   // should change completed to true
  //   // pull in the task this function
  //   // get access to the stats then switch the boolean
  //   // front-end tasks
  //   setMutableTask({...mutableTask, completed: !mutableTask.completed})
  //   // update tasks to new array of objects and statuses
  //   // back-end tasks
  //   const updatedTasks = tasks.map(item => task.id === item.id ? {...item, completed: !item.completed} : item)
  //   setTasks(updatedTasks)
  //   // console.log(updatedTasks)
  // }
  

  // update tasks to new array of objects and statuses with FIREBASE/FIRESTORE
  const markCompleted = () => {
    // front-end tasks
    setMutableTask({...mutableTask, completed: !mutableTask.completed})
    // back-end tasks from FIRESTORE

    const docRef = doc(db, 'tasks', task.id)
    const payload = {
      id: task.id,
      text: task.text,
      completed: !task.completed
    }
    setDoc(docRef, payload)
   
  }

  // filters tasks and updates state on click - flips status to true then rerenders false tasks
  // const removeTask = () => {
  //   const newTasks = tasks.map(item => task.id === item.id ? {...item, completed: !item.completed} : item)
  //   setTasks(newTasks.filter(task => task.completed == false))
  // }

  // delete single tasks with FIREBASE
  const removeTask = () => {
    deleteDoc(doc(db, 'tasks', task.id))
  }

  return (
    <div className='task-item'>

      <div className='check' onClick={markCompleted}>
        <div className={`check-mark ${checked} `}>
          {checkIcon}
        </div>
      </div>

      <div className={`task-text ${checked} ${theme}`}>
        <p>{mutableTask.text}</p>
      </div>

      <div className='delete-button'>
        <img src="/images/icon-cross.svg" alt="delete button" onClick={removeTask}/>
      </div>

    </div>
  )
}
