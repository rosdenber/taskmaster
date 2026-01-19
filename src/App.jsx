import { useState } from 'react'

function App() {
  // State for the input box
  const [inputValue, setInputValue] = useState('');

  // State for the list of tasks (array of objects: {text: string, completed: boolean})
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (inputValue.trim() === '') return; // Don't add empty tasks

    // Add new task to the existing array
    setTasks([...tasks, { text: inputValue, completed: false }]);

    // Clear the input box
    setInputValue('');
  };

  const deleteTask = (indexToDelete) => {
    // Create a new array excluding the item at the specific index
    const newTasks = tasks.filter((_, index) => index !== indexToDelete);
    setTasks(newTasks);
  };

  const toggleCompleted = (index) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="max-w-lg bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl p-8">
        <h1 className="text-4xl font-bold text-white text-center mb-8">TaskMaster</h1>

        <div className="flex items-center space-x-4 mb-8">
          <div className="relative flex-1">
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
              className="w-full px-4 py-3 pl-12 rounded-full border-2 border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors duration-200"
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">📝</span>
          </div>
          <button
            onClick={addTask}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Add
          </button>
        </div>

        {tasks.length === 0 ? (
          <div className="text-center text-gray-400 mb-8">
            <p className="text-lg">You're all caught up! 🎉</p>
            <p className="text-sm">Add your first task above.</p>
          </div>
        ) : (
          <>
            <ul className="space-y-4 mb-8">
              {tasks.map((task, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-gray-700 rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-200 animate-fade-in"
                >
                  <div className="flex items-center flex-1">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleCompleted(index)}
                      className="mr-4 w-5 h-5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <span
                      className={`flex-1 text-white ${task.completed ? 'line-through text-gray-500' : ''}`}
                    >
                      {task.text}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteTask(index)}
                    className="text-red-500 hover:text-red-400 focus:outline-none"
                  >
                    🗑️
                  </button>
                </li>
              ))}
            </ul>

            {totalTasks > 0 && (
              <div className="mb-6">
                <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-400 text-center">
                  {completedTasks} of {totalTasks} tasks completed
                </p>
              </div>
            )}
          </>
        )}

        <div className="text-center">
          <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
            {tasks.filter(task => !task.completed).length} pending task{tasks.filter(task => !task.completed).length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  )
}

export default App
