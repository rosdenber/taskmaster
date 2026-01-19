import { useState } from 'react'
import './App.css'

function App() {
  //State for the test input box
  const [inputValue, setInputValue] = useState('');

  //State for the list of tasks (an array of strings)
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (inputValue.trim() === '') return; //Don't add empty tasks

    //Add new task to the existing array
    setTasks([...tasks, inputValue]);

    //Clear the input box
    setInputValue('');
  };

  const deleteTask = (indextoDelete) => {
    //Create a new array excluding the item at the specific index
    const newTasks = tasks.filter((_, index) => index !== indextoDelete);
    setTasks(newTasks);
  };

  return (
    <div className="app-container">
      <h1>TaskMaster</h1>
      
      <div className="input-group">
        <input 
        type="text" 
        placeholder="Enter a task..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTask();
          }
        }}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button 
            className="delete-btn"
            onClick={() => deleteTask(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div className="task-count">
        You have {tasks.length} pending task{tasks.length !== 1 ? 's' : ''}.
      </div>
    </div>
  )
}
export default App
