import { useState } from 'react';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const addOrUpdateTodo = () => {
    if (todo.trim() === "") return; 

    const updatedTodos = editIndex !== null
      ? todos.map((item, index) => (index === editIndex ? todo : item))
      : [...todos, todo];

    setTodos(updatedTodos);
    setTodo(""); 
    setEditIndex(null); 
  };

  const startEditing = (index) => {
    setEditIndex(index);
    setTodo(todos[index]);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div className="max-w-md mx-auto my-6 p-4 bg-white shadow-lg rounded-lg border-2">
      <h1 className="text-center text-3xl font-bold mb-4">Todo Application</h1>

      <div className="flex gap-4 justify-center items-center my-4">
        <input
          type="text"
          placeholder="Enter Your Todo"
          className="flex-grow border-2 border-gray-300 p-2 rounded focus:border-blue-500"
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
            <span className="flex-grow">{item}</span>
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
  );
}

export default App;
