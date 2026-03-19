import { useEffect, useState } from 'react'
import './App.css'
import { createTask } from './api/tasks';
import { fetchTasks } from './api/tasks';
type Task = {
  id: number;
  text: string;
  done: boolean;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [text, setText] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchTasks()
    .then((data: Task[]) => setTasks(data))
    .catch((error) => console.error(error));
  }, [apiUrl]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmedText = text.trim();
    if (!trimmedText) return;

    try {
      const newTask: Task = await createTask(trimmedText);
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setText("");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div style={{ maxWidth: 500, margin: "40px auto" }}>
      <h1>Tasks</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setText(e.target.value)
          }
          placeholder="New task"
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.text} {task.done ? "✅" : ""}</li>
        ))}
      </ul>
    </div>
  );
}


export default App
