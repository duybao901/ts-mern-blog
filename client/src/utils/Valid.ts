import { UserRegister } from './TypeScript'
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