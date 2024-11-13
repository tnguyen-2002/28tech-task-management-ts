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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.changeMultiPatch = exports.detail = exports.index = void 0;
const task_model_1 = require("../../models/task.model");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const find = {
        deleted: false
    };
    if (req.query.status) {
        find["status"] = req.query.status;
    }
    const sort = {};
    if (req.query.sortKey && req.query.sortValue) {
        sort[`${req.query.sortKey}`] = req.query.sortValue;
    }
    var limitItems = 4;
    var page = 1;
    if (req.query.page) {
        page = parseInt(`${req.query.page}`);
    }
    if (req.query.limit) {
        limitItems = parseInt(`${req.query.limit}`);
    }
    const skip = (page - 1) * limitItems;
    if (req.query.keyword) {
        const regex = new RegExp(`${req.query.keyword}`, "i");
        find["title"] = regex;
    }
    const tasks = yield task_model_1.Task
        .find(find)
        .sort(sort);
    res.json(tasks);
});
exports.index = index;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const task = yield task_model_1.Task.findOne({
        _id: id,
        deleted: false
    });
    res.json(task);
});
exports.detail = detail;
const changeMultiPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const status = req.body.status;
    const ids = req.body.ids;
    yield task_model_1.Task.updateMany({
        _id: { $in: ids }
    }, {
        status: status
    });
    res.json({
        code: "success",
        message: "Successful!"
    });
});
exports.changeMultiPatch = changeMultiPatch;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const task = new task_model_1.Task(data);
    yield task.save();
    res.json({
        code: "success",
        message: "Create task successfully!",
        data: task
    });
});
exports.createTask = createTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.id;
    const data = req.body;
    yield task_model_1.Task.updateOne({
        _id: id
    }, data);
    res.json({
        code: "success",
        message: "Update task successfully",
    });
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ids = req.body.ids;
    yield task_model_1.Task.updateMany({
        _id: { $in: ids }
    }, {
        deleted: true
    });
    res.json({
        code: "success",
        message: "Delete task successfully!"
    });
});
exports.deleteTask = deleteTask;
