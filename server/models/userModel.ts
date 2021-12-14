import mongoose from 'mongoose'

const userScheme = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add your name"],
        trim: true,
        maxlength: [30, "Your name is up to 20 chars long."]
    },
    account: {
        type: String,
        required: [true, "Please add your email or phone"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please add your password"],
        trim: true,
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/dxnfxl89q/image/upload/v1639402088/samples/user_baooau.png"
    },
    role: {
        type: String,
        default: "user"
    },
    type: {
        type: String,
        default: 'register'
    }
})

// Create model
export default mongoose.model("User", userScheme)