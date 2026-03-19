const apiUrl = import.meta.env.VITE_API_URL;
    
export async function createTask(text: string) {
    const response = await fetch(`${apiUrl}/api/tasks`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: text }),
    });

    if (!response.ok) throw new Error('Failed to create task');
  
    return response.json();
}

export async function fetchTasks() {
    const response = await fetch(`${apiUrl}/api/tasks`);
    if (!response.ok) throw new Error('Failed to fetch tasks');
    return response.json();
}   
