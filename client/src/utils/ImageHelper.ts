export const checkImage = (file: File) => {
    let err = ''
    if (!file) return err = "File does not exits"

    if (file.size > 1024 * 1024) // 1MB
        err = "The largest image size is 1mb"

    // if (file.type != "image/jpeg" && file.type != "image/png" && file.type != "jpg")
    //     err = "Image format is incorrect"

    return err;
}


export const uploadImage = async (file: File) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "ecbytipr")
    formData.append("cloud_name", "dxnfxl89q")

    const URL = `https://api.cloudinary.com/v1_1/dxnfxl89q/image/upload`

    const res = await fetch(URL, {
        method: "POST",
        body: formData
    })

    const photo = await res.json();

    return photo
}