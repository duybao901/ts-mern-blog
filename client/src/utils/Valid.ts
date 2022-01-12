import { UserRegister, Blog } from './TypeScript'
export const validRegister = (userRegister: UserRegister) => {
    const errors: string[] = []
    const { name, account, password, cf_password } = userRegister

    if (!name) {
        errors.push("Please add your name.")
    } else if (name.length > 30) {
        errors.push("Your name is up to 30 chars long.")
    }

    if (!account) {
        errors.push('Please add your email or phone.')
    } else if (!validEmail(account) && !validPhone(account)) {
        errors.push("Email or phone number format is incorrect.")
    }

    if (password.length < 6) {
        errors.push("Password must be at least 6 character.")
    } else if (password !== cf_password) {
        errors.push("Password not match")
    }

    return errors

}

export const validPhone = (phone: string) => {
    const re = /^[+]/g
    return re.test(phone)
}

export const validEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const validBlog = (blog: Blog) => {
    let checks: string[] = []

    if (blog.title.trim().length < 20) {
        checks.push("Title is at least 20 characters")
    } else {
        if (blog.title.trim().length > 100) {
            checks.push("Title is up to at least 100 characters long")
        }
    }

    if (blog.description.trim().length < 80) {
        checks.push("Description is at least 80 characters")
    } else {
        if (blog.description.trim().length > 300) {
            checks.push("Description is up to at least 300 characters long")
        }
    }

    if (blog.content.trim().length < 500) {
        checks.push("Content is at least 500 characters")
    } else {
        if (blog.content.trim().length > 7000) {
            checks.push("Content is up to at least 7000 characters long")
        }
    }

    if (!blog.thumbnail) {
        checks.push("Thumbnail can't be left blank")
    }
    if (blog.category === "") {
        checks.push("Category can't be left blank")
    }

    if (blog.tags.length === 0) {
        checks.push("Tag can't be left blank")
    }

    return {
        errors: checks,
        errorsLength: checks.length
    };
}