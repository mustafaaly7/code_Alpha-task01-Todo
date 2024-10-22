import { useState } from 'react';
import './App.css';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const addOrUpdateTodo = () => {
    if (todo.trim() === "") return; // Prevent adding empty todos

    if (editIndex !== null) {
      // Update existing todo
      const updatedTodos = todos.map((item, index) =>
        index === editIndex ? todo : item
      );
      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      // Add new todo
      setTodos([...todos, todo]);
    }

    setTodo(""); // Clear input
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
    <div className='w-1/2 mx-auto my-6'>
      <h1 className='text-center text-4xl'>Todo Application</h1>

      <div className='flex gap-4 justify-center items-center my-4'>
        <input
          type="text"
          placeholder='Enter Your Todo'
          className='flex flex-grow border-2 p-2 px-2'
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button
          className='rounded p-2 bg-blue-500 text-white'
          onClick={addOrUpdateTodo}
        >
          {editIndex !== null ? 'Update Todo' : 'Add Todo'}
        </button>
      </div>

      <ul className='mt-4'>
        {todos.map((item, index) => (
          <li key={index} className='flex justify-between border-b p-2'>
            <span>{item}</span>
            <div>
              <button onClick={() => startEditing(index)} className='text-blue-500 mr-2'>
                Edit
              </button>
              <button onClick={() => deleteTodo(index)} className='text-red-500'>
                Delete Todo
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
