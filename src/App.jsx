import { useState } from 'react';
import "./App.css";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [completed, setCompleted] = useState([]); // State to track completed todos

  const addOrUpdateTodo = () => {
    if (todo.trim() === "") return;

    const updatedTodos = editIndex !== null
      ? todos.map((item, index) => (index === editIndex ? todo : item))
      : [...todos, todo];

    const updatedCompleted = editIndex !== null
      ? completed // keep existing completed states
      : [...completed, false]; // add new todo as incomplete

    setTodos(updatedTodos);
    setCompleted(updatedCompleted);
    setTodo("");
    setEditIndex(null);
  };

  const startEditing = (index) => {
    setEditIndex(index);
    setTodo(todos[index]);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    const updatedCompleted = completed.filter((_, i) => i !== index); // remove completion status
    setTodos(updatedTodos);
    setCompleted(updatedCompleted);
  };

  const toggleCompletion = (index) => {
    const updatedCompleted = completed.map((isCompleted, i) => 
      i === index ? !isCompleted : isCompleted
    );
    setCompleted(updatedCompleted);
  };

  return (
    <div className="background w-full h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-4 bg-white shadow-lg rounded-lg border-2">
        <h1 className="text-center text-3xl font-bold mb-4">Todo Application</h1>

        <div className="flex gap-4 justify-center items-center my-4">
          <input
            type="text"
            placeholder="Enter Your Todo"
            className="flex-grow border-2 border-gray-300 p-2 rounded focus:border-blue-500 font-bold"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition"
            onClick={addOrUpdateTodo}
          >
            {editIndex !== null ? 'Update Todo' : 'Add Todo'}
          </button>
        </div>

        <ul className="mt-4">
          {todos.map((item, index) => (
            <li key={index} className="flex justify-between items-center border-b border-gray-300 p-2">
              <h3 
                className={`flex-grow text-3xl ${completed[index] ? 'text-green-500 line-through' : ''}`} // Change color and add line-through for completed
                onClick={() => toggleCompletion(index)} // Toggle completion on click
              >
                {item}
              </h3>
              <div>
                <button
                  onClick={() => startEditing(index)}
                  className="bg-blue-500 text-white rounded px-2 py-1 mr-2 hover:bg-blue-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTodo(index)}
                  className="bg-red-500 text-white rounded px-2 py-1 hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
