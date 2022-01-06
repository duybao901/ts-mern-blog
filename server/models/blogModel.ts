import mongoose from 'mongoose'

const blogScheme = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: [10, "Title is at least 10 characters"],
        maxlength: [50, "Title is up to at least 50 characters long"]
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: [50, "Description is at least 50 characters"],
        maxlength: [200, "Description is up to at least 200 characters long"]
    },
    content: {
        type: String,
        required: true,
        maxlength: [2000, "Description is up to at least 2000 characters long"]
    },
    thumbnail: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "category"
    },
    tags: [
        {
            type: String,
            require: true,
        }
    ]

}, {
    timestamps: true
})

export default mongoose.model("Blog", blogScheme)