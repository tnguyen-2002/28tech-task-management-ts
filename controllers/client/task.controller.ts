import  { Request, Response } from "express";
import { Task } from "../../models/task.model";

export const index = async (req: Request, res: Response) => {
    const find = {
        deleted: false
    };

    if(req.query.status) {
        find["status"] = req.query.status;
    }

    // Sort
    const sort = {};
    if(req.query.sortKey && req.query.sortValue) {
        sort[`${req.query.sortKey}`] = req.query.sortValue;
      }

    // End sort
    
    // Pagination
    var limitItems = 4;
    var page = 1;

    if(req.query.page) {
        page = parseInt(`${req.query.page}`);
    }

    if(req.query.limit) {
        limitItems = parseInt(`${req.query.limit}`);
    }

    const skip = (page - 1) * limitItems;

    // End pagination
    const tasks = await Task
        .find(find)
        .limit(limitItems)
        .skip(skip)
        .sort(sort);
    

    res.json(tasks);
}

export const detail = async (req: Request, res: Response) => {
    const id: String = req.params.id;

    const task = await Task.findOne({
        _id: id,
        deleted: false
    });

    res.json(task);
}