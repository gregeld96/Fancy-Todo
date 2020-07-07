const { Todo } = require('../models');

class TodoController {
    static add(req, res, next){
        let userId = req.userData.id;

        const newTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            userId
        }

        Todo
            .create(newTodo)
            .then(todo => {
                res.status(201).json({ todo })
            })
            .catch(err => {
                next(err)
            })
    }

    static read(req, res, next){
        let userId = req.userData.id;

        Todo
            .findAll({
                where: {
                    userId
                }
            })
            .then(data => {
                res.status(200).json({ todos: data })
            })
            .catch(err => {
                next(err)
            })
    }

    static filter(req, res, next){
        Todo
            .findByPk(req.params.id)
            .then(data => {
                if(data === null){
                    throw ({status: 404, msg: "Data not found"})
                } else {
                    res.status(200).json({ todo: data })
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static update(req, res, next){
        const updatedTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }

        Todo
            .findByPk(req.params.id)
            .then(data => {
                if (data === null){
                    throw ({status: 404, msg: "Data not found"})
                } else {
                    return Todo.update(updatedTodo, {where: {id: req.params.id}})
                }
            })
            .then(data => {
                res.status(200).json({ todo: updatedTodo })
            })
            .catch(err => {
                next(err)
            })
    }

    static delete(req, res, next){
        let info = null;
        Todo
            .findByPk(req.params.id)
            .then(data => {
                if (data === null){
                    throw ({status: 404, msg: "Data not found"})
                } else {
                    info = data
                    return Todo.destroy({where: {id: req.params.id}})
                }
            })
            .then(data => {
                res.status(200).json({ todo: info })
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = TodoController;