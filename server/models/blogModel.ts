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
        minlength: [20, "Title is at least 20 characters"],
        maxlength: [100, "Title is up to at least 100 characters long"]
    },
    slug: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: [80, "Description is at least 80 characters"],
        maxlength: [300, "Description is up to at least 300 characters long"]
    },
    content: {
        type: String,
        required: true,
        maxlength: [7000, "Description is up to at least 7000 characters long"]
    },
    thumbnail: {
        type: String,
        required: true,
    },
    isFeature: {
        type: Boolean,
        default: false
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
    ],
    views: {
        type: String,
        default: 0
    }

}, {
    timestamps: true
})

export default mongoose.model("Blog", blogScheme)