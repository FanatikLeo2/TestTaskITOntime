import Task from '../models/task';

interface TaskData {
    number?: number;
    title: string;
    description: string;
    createdAt: Date;
    dueDate?: Date;
    tags?: string[];
}
let lastTaskNumber = 0;

async function getNextTaskNumber() {
    const latestTask = await Task.findOne().sort({ number: -1 }).exec(); 
    if (latestTask) {
      lastTaskNumber = latestTask.number + 1; 
    } else {
      lastTaskNumber = 1; 
    }
    return lastTaskNumber;
  }

async function getTasks() {
    try {
        return await Task.find();
    } catch (error: any) {
        throw new Error(`Ошибка при получении задач: ${error.message}`);
    }
}

async function createTask(taskData: TaskData) {
    try {
        const nextTaskNumber = await getNextTaskNumber();
        taskData.number = nextTaskNumber
        const newTask = new Task(taskData);
        await newTask.save();
        return newTask;
    } catch (error: any) {
        throw new Error(`Ошибка при создании задачи: ${error.message}`);
    }
}

async function updateTask(id: string, taskData: TaskData) {
    try {
        return await Task.findByIdAndUpdate(id, taskData, { new: true });
    } catch (error: any) {
        throw new Error(`Ошибка при обновлении задачи: ${error.message}`);
    }
}

async function deleteTask(id: string) {
    try {
        await Task.findByIdAndDelete(id);
    } catch (error: any) {
        throw new Error(`Ошибка при удалении задачи: ${error.message}`);
    }
}

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
};
