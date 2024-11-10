import mongoose from "mongoose";

const taskScheme = new mongoose.Schema(
    {
        title: String,
        taskParentId: String,
        status: String,
        content: String,
        timeStart: Date,
        timeFinish: Date,
        createdBy: String,
        listUser: Array,
        deleted: {
            type: Boolean,
            default: false,
        },
        deletedAt: Date,
    },
    {
        timestamps: true,
    }
);

export const Task = mongoose.model("Task", taskScheme, "tasks");