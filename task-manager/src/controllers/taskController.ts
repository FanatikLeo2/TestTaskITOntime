'use strict';

import { Request, Response, NextFunction } from 'express';
const taskService = require('../services/taskService');
const { body, param, validationResult } = require('express-validator');
type MiddlewareFn = (req: Request, res: Response, next: NextFunction) => void;

const validateCreateTask = [
  body('title').notEmpty().withMessage('Заголовок не может быть пустым'),
  body('description').optional().isString().withMessage('Описание должно быть строкой'),
  body('dueDate').optional().isISO8601().toDate().withMessage('Неверный формат даты завершения'),
  body('tags').optional().isArray().withMessage('Теги должны быть массивом'),
  (req: Request, res: Response, next: Function) => {
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
    (req: Request, res: Response, next: Function) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

async function getTasks(req: Request, res: Response) {
    try {
        const tasks = await taskService.getTasks();
        res.json(tasks);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
}

async function createTask(req: Request, res: Response) {
  try {
      for (let middleware of validateCreateTask) {
          await middleware(req, res, () => {});
      }
      const {  title, description, dueDate, tags } = req.body;
      const newTask = await taskService.createTask({  title, description, dueDate, tags });
      res.status(201).json(newTask);
  } catch (error: any) {
      res.status(500).send(error.message);
  }
}

async function updateTask(req: Request, res: Response) {
  try {
      for (let middleware of validateUpdateTask) {
          await middleware(req, res, () => {});
      }
      const { id } = req.params;
      const { title, description, dueDate, tags } = req.body;
      const updatedTask = await taskService.updateTask(id, { title, description, dueDate, tags });
      res.json(updatedTask);
  } catch (error: any) {
      res.status(500).send(error.message);
  }
}

async function deleteTask(req: Request, res: Response) {
    const { id } = req.params;
    try {
        await taskService.deleteTask(id);
        res.json({ message: 'Задача удалена' });
    } catch (error: any) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
};