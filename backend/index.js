require('dotenv').config();
const express = require("express");
const cors = require("cors");
const prisma = require('./db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => { res.json({ ok: true });});


app.get("/api/items", async (req, res) => {
    
});

app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from the backend" });
});


app.get("/api/tasks", async (req, res) => { 
    try {
        const tasks = await prisma.task.findMany({
            orderBy: { id: 'desc' },
        });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

app.post("/api/tasks", async (req, res) => {
    try {
        const { text } = req.body;
        if (!text || !text.trim()) return res.status(400).json({ error: 'Text is required' });
        const task = await prisma.task.create({
            data: { text: text.trim() },
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create task' });
    }
});

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});