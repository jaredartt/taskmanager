const express = require('express');
const router = express.Router();
const taskController = require('../controllers/tasks');
const { createTask } = require('../controllers/tasks'); // Import the createTask function

// GET all tasks
router.get(['/all', '/'], async (req, res) => {
  try {
    const tasks = await taskController.getAllTasks();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// GET a single task by ID
router.get('/:id', async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await taskController.getTaskById(taskId);
    if (!task) {
      res.status(404).send('Task not found');
    } else {
      res.json(task);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


// Other routes (POST, PUT, DELETE)

// POST route to create a new task
router.post("/", async (req, res) => {
  try {
    const newTaskData = req.body; // Get the new task data from the request body

    // Call the createTask function to create the new task
    const createdTask = await createTask(newTaskData);

    // Respond with a 201 status code and the ID of the newly created task
    res.status(201).json(createdTask);
  } catch (error) {
    // Handle errors, such as database connection issues or validation failures
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// PUT route to update a task by ID
router.put('/:id', async (req, res) => {
  const taskId = req.params.id;
  try {
    // Extract updated task data from req.body
    const updatedTaskData = req.body;

    // Split the comma-separated tags into an array
    if (updatedTaskData.tags) {
      updatedTaskData.tags = updatedTaskData.tags.split(',');
    }

    // Assuming you have a function like updateTaskById in your controller
    await taskController.updateTaskById(taskId, updatedTaskData);

    // Return a 204 status code to indicate success (no content)
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// DELETE route to delete a task by ID
router.delete('/:id', async (req, res) => {
  const taskId = req.params.id;
  try {
    // Assuming you have a function like deleteTaskById in your controller
    await taskController.deleteTaskById(taskId);

    // Return a 200 status code to indicate success
    res.status(200).send('Task deleted');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;