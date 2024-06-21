import { Request, Response } from 'express';
import Task from '../models/task';

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const createTask = async (req: Request, res: Response) => {
  const { number, title, description, dueDate, tags } = req.body;
  try {
    const newTask = new Task({ number, title, description, dueDate, tags });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { number, title, description, dueDate, tags } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(id, { number, title, description, dueDate, tags }, { new: true });
    res.json(updatedTask);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    res.json({ message: 'Task deleted' });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};