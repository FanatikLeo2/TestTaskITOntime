"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTasks = void 0;
const task_1 = __importDefault(require("../models/task"));
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield task_1.default.find();
        res.json(tasks);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.getTasks = getTasks;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { number, title, description, dueDate, tags } = req.body;
    try {
        const newTask = new task_1.default({ number, title, description, dueDate, tags });
        yield newTask.save();
        res.status(201).json(newTask);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.createTask = createTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { number, title, description, dueDate, tags } = req.body;
    try {
        const updatedTask = yield task_1.default.findByIdAndUpdate(id, { number, title, description, dueDate, tags }, { new: true });
        res.json(updatedTask);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield task_1.default.findByIdAndDelete(id);
        res.json({ message: 'Task deleted' });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.deleteTask = deleteTask;
