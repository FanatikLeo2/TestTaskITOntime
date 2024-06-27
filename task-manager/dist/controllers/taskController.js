'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const taskService = require('../services/taskService');
const { body, param, validationResult } = require('express-validator');
const validateCreateTask = [
    body('title').notEmpty().withMessage('Заголовок не может быть пустым'),
    body('description').optional().isString().withMessage('Описание должно быть строкой'),
    body('dueDate').optional().isISO8601().toDate().withMessage('Неверный формат даты завершения'),
    body('tags').optional().isArray().withMessage('Теги должны быть массивом'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
const validateUpdateTask = [
    param('id').isMongoId().withMessage('Неверный ID задачи'),
    body('title').optional().notEmpty().withMessage('Заголовок не может быть пустым'),
    body('description').optional().isString().withMessage('Описание должно быть строкой'),
    body('dueDate').optional().isISO8601().toDate().withMessage('Неверный формат даты завершения'),
    body('tags').optional().isArray().withMessage('Теги должны быть массивом'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
function getTasks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const tasks = yield taskService.getTasks();
            res.json(tasks);
        }
        catch (error) {
            res.status(500).send(error.message);
        }
    });
}
function createTask(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            for (let middleware of validateCreateTask) {
                yield middleware(req, res, () => { });
            }
            const { title, description, dueDate, tags } = req.body;
            const newTask = yield taskService.createTask({ title, description, dueDate, tags });
            res.status(201).json(newTask);
        }
        catch (error) {
            res.status(500).send(error.message);
        }
    });
}
function updateTask(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            for (let middleware of validateUpdateTask) {
                yield middleware(req, res, () => { });
            }
            const { id } = req.params;
            const { title, description, dueDate, tags } = req.body;
            const updatedTask = yield taskService.updateTask(id, { title, description, dueDate, tags });
            res.json(updatedTask);
        }
        catch (error) {
            res.status(500).send(error.message);
        }
    });
}
function deleteTask(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            yield taskService.deleteTask(id);
            res.json({ message: 'Задача удалена' });
        }
        catch (error) {
            res.status(500).send(error.message);
        }
    });
}
module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
};
