const express = require('express');
const router = express.Router();
const taskService = require('./task.service');

// routes
router.post('/add', createTask);
router.get('/', getTaskList);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);


module.exports = router;

function createTask(req, res, next) {
    taskService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getById(req, res, next) {
    taskService.getById(req.params.id)
        .then(taskDetails => taskDetails ? res.json(taskDetails) : res.sendStatus(404))
        .catch(err => next(err));
}

function getTaskList(req, res, next) {
    taskService.getAll(req.body)
        .then(tasks => res.json(tasks))
        .catch(err => next(err));
}

function update(req, res, next) {
    taskService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    taskService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}