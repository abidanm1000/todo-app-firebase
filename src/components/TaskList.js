import React from 'react'
import { FilterControl } from './FilterControl'
import { Task } from './Task'

const TaskList = ({ tasks, setTasks, filterStatus, setFilterStatus, filteredTasks, clearCompleted, theme }) => {  

  return (
    <div className={`task-list-wrapper ${theme}`}>

      <div className='task-list'>
        { filteredTasks.map( task => <Task 
                                key={task.id} 
                                task={task}
                                tasks={tasks}
                                setTasks={setTasks}
                                filteredTasks={filteredTasks}
                                theme={theme}
                              /> )}
      </div>


      <div className='task-items-info'>

        <div className='items-left'>
          {filteredTasks.length} items
        </div>

        <FilterControl filterStatus={filterStatus} setFilterStatus={setFilterStatus} theme={theme}/>

        <div className={`items-clear ${theme}`}>
          <span onClick={clearCompleted}> Clear Completed </span>
        </div>

      </div>
    </div>
  )
}

export default TaskList