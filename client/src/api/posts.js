import axios from "axios";

export const getPostsRequest = async () => await axios.get("/posts");

export const createPostRequest = async (post) => {
    const formData = new FormData();

    Object.keys(post).forEach((key) => {
        formData.append(key, post[key]);
    });

    return await axios.post("/posts", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

export const getPostRequest = async (id) => await axios.get(`/posts/${id}`);

export const updatePostRequest = async (id, post) =>
    await axios.put(`/posts/${id}`, post);

export const deletePostRequest = async (id) => await axios.delete(`/posts/${id}`);