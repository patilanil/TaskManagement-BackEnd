const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Task = db.Task;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};


async function getAll(taskParams) {
    console.log("===============params", taskParams);
    return await Task.find({ userId: taskParams.userDetails._id });
}

async function getById(id) {
    return await Task.findById(id);
}

async function create(taskParams) {
    // validate
    if (await Task.findOne({ taskName: taskParams.taskName, userId: taskParams.userDetails._id })) {
        throw 'Taskname "' + taskParams.taskName + '" is already taken';
    }

    const task = new Task({...taskParams,  userId: taskParams.userDetails._id });

    // save Task
    await task.save();
}

async function update(id, taskParams) {
    const user = await Task.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== taskParams.username && await Task.findOne({ username: taskParams.username })) {
        throw 'Username "' + taskParams.username + '" is already taken';
    }

    // hash password if it was entered
    if (taskParams.password) {
        taskParams.hash = bcrypt.hashSync(taskParams.password, 10);
    }

    // copy taskParams properties to user
    Object.assign(user, taskParams);

    await user.save();
}

async function _delete(id) {
    await Task.findByIdAndRemove(id);
}