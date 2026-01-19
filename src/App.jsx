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
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background layer */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-indigo-900/30 bg-[length:400%_400%] animate-gradient"
      ></div>
      <div className="max-w-lg bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-700 relative overflow-hidden z-10">
        <h1 className="text-4xl font-bold text-center mb-8 gradient-text">TaskMaster</h1>

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
              className="w-full px-4 py-3 pl-12 rounded-full border-2 border-transparent bg-gray-700/80 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-all duration-300 shadow-lg focus:shadow-xl"
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400">📝</span>
          </div>
          <button
            onClick={addTask}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-full text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
          >
            Add
          </button>
        </div>

        {tasks.length === 0 ? (
          <div className="text-center text-gray-300 mb-8">
            <p className="text-lg font-medium">You're all caught up! 🎉</p>
            <p className="text-sm mt-2 text-gray-400">Add your first task above.</p>
          </div>
        ) : (
          <>
            <ul className="space-y-4 mb-8 relative">
              {tasks.map((task, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-gray-700/80 rounded-lg p-4 shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in border border-gray-600 hover:border-cyan-500/30"
                >
                  <div className="flex items-center flex-1">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleCompleted(index)}
                      className="mr-4 w-5 h-5 text-cyan-500 bg-gray-700 border-gray-500 rounded focus:ring-cyan-500 focus:ring-2 cursor-pointer"
                    />
                    <span
                      className={`flex-1 text-white font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-100'}`}
                    >
                      {task.text}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteTask(index)}
                    className="text-red-400 hover:text-red-300 focus:outline-none p-2 rounded-full hover:bg-red-900/30 transition-all duration-200"
                  >
                    🗑️
                  </button>
                </li>
              ))}
            </ul>

            {totalTasks > 0 && (
              <div className="mb-6">
                <div className="w-full bg-gray-800 rounded-full h-3 mb-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-300 text-center font-medium">
                  {completedTasks} of {totalTasks} tasks completed
                </p>
              </div>
            )}
          </>
        )}

        <div className="text-center">
          <span className="inline-block bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg animate-pulse-ring">
            {tasks.filter(task => !task.completed).length} pending task{tasks.filter(task => !task.completed).length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  )
}

export default App
