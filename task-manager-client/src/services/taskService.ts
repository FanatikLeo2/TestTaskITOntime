import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

export interface Task {
  _id?: string;
  number: number;
  title: string;
  description: string;
  createdAt?: Date;
  dueDate?: Date;
  tags?: string[];
}

export const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createTask = async (task: Task) => {
  const response = await axios.post(API_URL, task);
  return response.data;
};

export const updateTask = async (id: string, task: Task) => {
  const response = await axios.put(`${API_URL}/${id}`, task);
  return response.data;
};

export const deleteTask = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};