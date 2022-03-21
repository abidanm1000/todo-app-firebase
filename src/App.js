import './App.css';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import { useState, useEffect } from 'react';
// Part 1:
// - Finish up minor css
// - Create a data array of objects (todos)
// - Create a state that holds that tasks data
// - Pass that data to Tasklist and map through to create Task component for each task
// - Destrcture props and make Task dynamic

// Part 2:
// - Pass tasks and setTasks state to TaskInput
// - Create input state
// - Set up handleChange function to update input state
// - set value of input to input
// - Create handleForm function to create new Task
// - Create an new task object and how would you add that to the array of tasks?

const data = [
  { id: 1, text: 'Finish todo functionality', completed: false },
  { id: 2, text: "Study react hooks", completed: false },
  { id: 3, text: "Finish Clever programmer challenge", completed: false },
  { id: 4, text: "Run 1 mile", completed: false },
  { id: 5, text: "Finish errands", completed: false },
  { id: 6, text: "Complete Todo App", completed: false },
]


function App() {
  const [tasks, setTasks] = useState(data)
  const [filteredTasks, setFilteredTasks] = useState(tasks)
  const [filterStatus, setFilterStatus] = useState('all')
  const [theme, setTheme] = useState('')

  // activates light mode when switchTheme runs on click
  let switchTheme = () => theme == '' ? setTheme('lightMode') : setTheme('');

  // changes sun icon when in light mode
  let switchIcon = theme == '' ? '/images/icon-sun.svg' : '/images/icon-moon.svg';


  let clearCompleted = () => {
    setTasks(tasks.filter(task => task.completed == false))
  }


  // useEffect - hook that lets us perform 'side effects' at any stage of component lifecycle
  // side effects - api call, adding an event listener, a function, that I want to run
  useEffect(()=> {
    // when I change my filterStatus I want to update my tasks to the corresponding filterStatus
    const handleFilter = () => {
      if(filterStatus === 'active') {
        setFilteredTasks(tasks.filter(task => task.completed == false))
      }
      else if(filterStatus === 'completed') {
        setFilteredTasks(tasks.filter(task => task.completed == true))

      } else {
        setFilteredTasks(tasks)
      }
    }

    handleFilter()
    
  }, [filterStatus, tasks])


  // Component Life Cycle
  // componentWillMount (first render)
  // componentDidUpdate (when it rerenders)
  // componentWillUnmount (when the component is removed from the app)


  return (
    <div className={`App ${theme}`}>
      <div className='container'>

        <div className='header'>
          <h1>TODO</h1>
          <img src={switchIcon} onClick={switchTheme}></img>
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
  );
}

export default App;
