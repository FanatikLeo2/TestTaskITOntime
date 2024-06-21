import { Schema, model, Document } from 'mongoose';

interface ITask extends Document {
  number: number;
  title: string;
  description: string;
  createdAt: Date;
  dueDate?: Date;
  tags?: string[];
}

const taskSchema = new Schema<ITask>({
  number: { type: Number, required: true},
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  dueDate: { type: Date },
  tags: { type: [String] },
});

const Task = model<ITask>('Task', taskSchema);

export default Task;