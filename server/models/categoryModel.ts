import mongoose from "mongoose";

import { Category } from "../config/interface";

const categoryScheme = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add your category name"],
        trim: true,
        unique: true,
        maxlength: [50, "Name is up to 50 chars long."]
    }
}, {
    timestamps: true
})

export default mongoose.model<Category>("Category", categoryScheme)