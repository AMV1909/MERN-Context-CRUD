import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (filePath) => {
    return await cloudinary.uploader.upload(filePath, {
        folder: "posts",
    });
};

const deleteImage = async (public_id) => {
    await cloudinary.uploader.destroy(public_id);
};

export { uploadImage, deleteImage };
