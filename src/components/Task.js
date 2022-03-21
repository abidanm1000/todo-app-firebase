import React, {useState} from 'react'
import Check from '../images/icon-check.svg'

export const Task = ({ task, tasks, setTasks, theme }) => {
  
  // create a state variable to keep track of mutable todos/tasks
  const [mutableTask, setMutableTask] = useState(task)
  
  const checked = mutableTask.completed ? 'checked' : '';
  const checkIcon = mutableTask.completed ? (<img src={Check} alt='completed' />) : '';

  const markCompleted = () => {
    // console.log(task)
    // what should happen when I click?
    // update css to checked
   
    
    // should change completed to true
    // pull in the task this function
    // get access to the stats then switch the boolean
    // front-end tasks
    setMutableTask({...mutableTask, completed: !mutableTask.completed})
    // update tasks to new array of objects and statuses
    // back-end tasks
    const updatedTasks = tasks.map(item => task.id === item.id ? {...item, completed: !item.completed} : item)
    setTasks(updatedTasks)
    // console.log(updatedTasks)
  }


  // filters tasks and updates state on click - flips status to true then rerenders false tasks
  const removeTask = () => {
    const newTasks = tasks.map(item => task.id === item.id ? {...item, completed: !item.completed} : item)
    setTasks(newTasks.filter(task => task.completed == false))
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
