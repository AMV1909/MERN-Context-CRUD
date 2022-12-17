import { useState, createContext, useEffect } from "react";
import {
    getPostsRequest,
    createPostRequest,
    getPostRequest,
    updatePostRequest,
    deletePostRequest,
} from "../api/posts";

const PostContext = createContext();

const PostContextProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        (async () => {
            await getPostsRequest()
                .then((response) => {
                    setPosts(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        })();
    }, []);

    const createPost = async (post) => {
        return await createPostRequest(post)
            .then((response) => {
                setPosts([...posts, response.data]);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getPost = async (id) => {
        return await getPostRequest(id)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const updatePost = async (id, post) => {
        return await updatePostRequest(id, post)
            .then((response) => {
                setPosts(posts.map((post) => post._id === id ? response.data : post));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const deletePost = async (id) => {
        return await deletePostRequest(id)
            .then(() => {
                setPosts(posts.filter((post) => post._id !== id));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <PostContext.Provider
            value={{ posts, createPost, getPost, updatePost, deletePost }}
        >
            {children}
        </PostContext.Provider>
    );
};

export { PostContext, PostContextProvider };
