const Task = require('../models/tasks');

async function createTast(req, res, next) {
    try {
        const role = req.user.role; // this has been set after token verify. 
        
        //only Manager and Admin can add task.
        if (role === 'Manager' || role === 'Admin') {
            const newTask = new Task(req.body);
            const task = await newTask.save();
            return res.status(201).json(task);
        } else {
            //This is custom error object which store status and message passed to error handler
            const error = {};
            error.status = 403;
            error.message = "Forbidden, You don't have access!!";

            //calling error handlers middleware.
            return next(error);
        }
    } catch (error) {
        return next(error);
    }
}
async function updateTask(req, res, next) {
    try {
        const role = req.user.role;
        const task_id = req.params._id;
        
        if (role === 'Admin' || role === 'Manager' || role === 'Employee') {
            //task find by id and update only field that's specify in req.body
            const updatedTask = await Task.findByIdAndUpdate(task_id, req.body, {new: true});
            return res.status(201).json(updatedTask);
        } else {
            const error = {};
            error.status = 403;
            error.message = "Forbidden, Access Denied";
            //calling errorHandler middleware
            return next(error);
        }
    } catch (error) {
        return next(error);
    }
}
async function fetchTask(req, res, next) {
    try {
        const role = req.user.role;
        const user_id = req.user._id;
        const departments = req.user.department;
        let response = [];
        if (role === "Admin") {
            response = await Task.find();
        } else if (role === "Manager") {
            response = await Task.find({department:departments});
        } else if (role === "Employee") {
            response = await Task.find({ userId: user_id});
        } else {
            const error = {};
            error.status = 403;
            error.message = "Forbidden, Access Denied!";
            //calling errorHandler middleware
            return next(error);
        }
        return res.status(200).json(response);
    } catch (error) {
        //calling errorHandler middleware
        return next(error);
    }
}
module.exports = { createTast, updateTask, fetchTask };