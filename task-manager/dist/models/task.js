"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const taskSchema = new mongoose_1.Schema({
    number: { type: Number, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    dueDate: { type: Date },
    tags: { type: [String] },
});
const Task = (0, mongoose_1.model)('Task', taskSchema);
exports.default = Task;
