const { Todo } = require('../models');

class TodoController {
    static add(req, res){
        const newTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }

        Todo
            .create(newTodo)
            .then(todo => {
                res.status(201).json({ todo })
            })
            .catch(err => {
                let errArr = [];
                if(err.name === "SequelizeValidationError"){
                    for( let i = 0; i < err.errors.length; i++){
                        errArr.push(err.errors[i].message)
                    }
                }

                if(errArr.length > 0){
                    res.status(400).json({msg: errArr.toString()})
                } else {
                    res.status(500).json(err.message)
                }
            })
    }

    static read(req, res){
        Todo
            .findAll()
            .then(data => {
                res.status(200).json({ todos: data })
            })
            .catch(err => {
                console.log(`INTERNAL SERVER ERROR`)
                res.status(500).json(err.message)
            })
    }

    static filter(req, res){
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
                if (err.status) res.status(err.status).json({msg: err.msg});
            })
    }

    static update(req, res){
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
                let errArr = [];
                if(err.name === "SequelizeValidationError"){
                    for( let i = 0; i < err.errors.length; i++){
                        errArr.push(err.errors[i].message)
                    }
                }

                if(errArr.length > 0){
                    res.status(400).json({msg: errArr})
                } else {
                    if (err.status) res.status(err.status).json({msg: err.msg});
                    else res.status(500).json(err.message);
                }
            })
    }

    static delete(req, res){
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
                //console.log(err);
                if (err.status) res.status(err.status).json({msg: err.msg});
                else res.status(500).json(err.message);
            })
    }
}

module.exports = TodoController;