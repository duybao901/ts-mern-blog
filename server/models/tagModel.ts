import mongoose from "mongoose";

import { Tag } from "../config/interface";

const tagScheme = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add your tag name"],
        trim: true,
        unique: true,
        maxlength: [50, "Name is up to 50 chars long."]
    }
}, {
    timestamps: true
})

export default mongoose.model<Tag>("Tag", tagScheme)