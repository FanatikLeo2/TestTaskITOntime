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
const task_1 = __importDefault(require("../models/task"));
let lastTaskNumber = 0;
function getNextTaskNumber() {
    return __awaiter(this, void 0, void 0, function* () {
        const latestTask = yield task_1.default.findOne().sort({ number: -1 }).exec();
        if (latestTask) {
            lastTaskNumber = latestTask.number + 1;
        }
        else {
            lastTaskNumber = 1;
        }
        return lastTaskNumber;
    });
}
function getTasks() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield task_1.default.find();
        }
        catch (error) {
            throw new Error(`Ошибка при получении задач: ${error.message}`);
        }
    });
}
function createTask(taskData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const nextTaskNumber = yield getNextTaskNumber();
            taskData.number = nextTaskNumber;
            const newTask = new task_1.default(taskData);
            yield newTask.save();
            return newTask;
        }
        catch (error) {
            throw new Error(`Ошибка при создании задачи: ${error.message}`);
        }
    });
}
function updateTask(id, taskData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield task_1.default.findByIdAndUpdate(id, taskData, { new: true });
        }
        catch (error) {
            throw new Error(`Ошибка при обновлении задачи: ${error.message}`);
        }
    });
}
function deleteTask(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield task_1.default.findByIdAndDelete(id);
        }
        catch (error) {
            throw new Error(`Ошибка при удалении задачи: ${error.message}`);
        }
    });
}
module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
};
