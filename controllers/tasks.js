const { MongoClient, ObjectId } = require('mongodb');

// Function to connect to the database.
async function connectToDatabase() {
  try {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    return client;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}

// Function to retrieve all tasks
async function getAllTasks() {
  const client = await connectToDatabase();
  try {
    const database = client.db("taskmanager");
    const collection = database.collection("tasks");
    const tasks = await collection.find({}).toArray();
    return tasks;
  } catch (error) {
    console.error('Error retrieving tasks:', error);
    throw error;
  } finally {
    client.close();
  }
}

// Function to retrieve a single task by ID
async function getTaskById(taskId) {
  const client = await connectToDatabase();
  try {
    const database = client.db("taskmanager");
    const collection = database.collection("tasks");
    const task = await collection.findOne({ _id: new ObjectId(taskId) });
    return task;
  } catch (error) {
    console.error('Error retrieving task by ID:', error);
    throw error;
  } finally {
    client.close();
  }
}

// Function to create a new task
async function createTask(newTaskData) {
  const client = await connectToDatabase();
  try {
    const database = client.db("taskmanager");
    const collection = database.collection("tasks");

    // Insert the new task into the collection
    const result = await collection.insertOne(newTaskData);

    if (result.acknowledged) {
      const newtaskId = result.insertedId; // Get the inserted ID
      const location = `/tasks/${newtaskId}`;
      return { id: result.insertedId }; // Return the inserted ID
    } else {
      throw new Error('Failed to insert task');
    }
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  } finally {
    client.close();
  }
}


// Function to update a task by ID
async function updateTaskById(taskId, updatedTaskData) {
  const client = await connectToDatabase();
  try {
    const database = client.db("taskmanager");
    const collection = database.collection("tasks");

    // Update the task based on its ID
    await collection.updateOne({ _id: new ObjectId(taskId) }, { $set: updatedTaskData });
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  } finally {
    client.close();
  }
}

// Function to delete a task by ID
async function deleteTaskById(taskId) {
  const client = await connectToDatabase();
  try {
    const database = client.db("taskmanager");
    const collection = database.collection("tasks");

    // Delete the task based on its ID
    await collection.deleteOne({ _id: new ObjectId(taskId) });
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  } finally {
    client.close();
  }
}

// Other CRUD functions (create, update, delete) can be added here as needed

module.exports = {
  connectToDatabase,
  getAllTasks,
  getTaskById,
  createTask,
  updateTaskById,
  deleteTaskById,
  // Export other functions as needed
};