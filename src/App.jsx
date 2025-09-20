import { useState } from 'react'
import './App.css'

// TodoItem component for individual todo items
function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="todo-checkbox"
      />
      <span className="todo-text">{todo.text}</span>
      <button 
        onClick={() => onDelete(todo.id)}
        className="delete-btn"
        aria-label="Delete todo"
      >
        ✕
      </button>
    </div>
  )
}

// TodoList component to display all todos
function TodoList({ todos, onToggle, onDelete }) {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <p>No todos yet! Add one above to get started.</p>
      </div>
    )
  }

  return (
    <div className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

// Main App component
function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React basics", completed: false },
    { id: 2, text: "Build a todo app", completed: true },
    { id: 3, text: "Master React hooks", completed: false }
  ])
  const [inputValue, setInputValue] = useState('')

  // Add a new todo
  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false
      }
      setTodos([...todos, newTodo])
      setInputValue('')
    }
  }

  // Toggle todo completion
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  // Delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  // Count completed and total todos
  const completedCount = todos.filter(todo => todo.completed).length
  const totalCount = todos.length

  return (
    <div className="app">
      <div className="app-container">
        <header className="app-header">
          <h1>My Todo List</h1>
          <p className="todo-stats">
            {completedCount} of {totalCount} todos completed
          </p>
        </header>

        <main className="app-main">
          <div className="add-todo-section">
            <div className="input-group">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="What needs to be done?"
                className="todo-input"
              />
              <button onClick={addTodo} className="add-btn">
                Add Todo
              </button>
            </div>
          </div>

          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        </main>

        <footer className="app-footer">
          <p>Built with React ⚛️</p>
        </footer>
      </div>
    </div>
  )
}

export default App
