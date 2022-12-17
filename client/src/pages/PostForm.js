import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useContext, useEffect, useState } from "react";
import { PostContext } from "../context/PostContext.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function PostForm() {
    const [post, setPost] = useState({
        title: "",
        description: "",
        image: null,
    });
    const { createPost, getPost, updatePost } = useContext(PostContext);
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        (async () => {
            if (params.id) {
                await getPost(params.id).then((response) => {
                    setPost(response);
                });
            }
        })();
    }, [params.id, getPost]);

    return (
        <div className="flex items-center justify-center">
            <div className="bg-zinc-800 p-10 shadow-md shadow-black">
                <header className="flex justify-between items-center py-4 text-white">
                    <h3 className="text-xl">New Post</h3>
                    <Link
                        to="/"
                        className="text-gray-400 text-sm hover:text-gray-300"
                    >
                        Go Back
                    </Link>
                </header>

                <Formik
                    initialValues={post}
                    onSubmit={async (values, actions) => {
                        if (params.id) {
                            await updatePost(params.id, values);
                        } else {
                            await createPost(values);
                        }

                        actions.setSubmitting(false);
                        navigate("/");
                    }}
                    validationSchema={Yup.object({
                        title: Yup.string().required("Title is required"),
                        description: Yup.string().required(
                            "Description is required"
                        ),
                        image: Yup.mixed().required("Image is required"),
                    })}
                    enableReinitialize={true}
                >
                    {({ handleSubmit, setFieldValue, isSubmitting }) => (
                        <Form onSubmit={handleSubmit}>
                            <label
                                htmlFor="title"
                                className="text-sm block font-bold text-gray-400"
                            >
                                Title
                            </label>
                            <Field
                                name="title"
                                placeholder="title"
                                className="px-3 py-2 focus:outline-none bg-gray-600 text-white w-full mb-4"
                            />
                            <ErrorMessage
                                name="title"
                                component="p"
                                className="text-red-400 text-sm"
                            />

                            <label
                                htmlFor="description"
                                className="text-sm block font-bold text-gray-400"
                            >
                                Description
                            </label>
                            <Field
                                component="textarea"
                                name="description"
                                placeholder="description"
                                className="px-3 py-2 focus:outline-none bg-gray-600 text-white w-full"
                                rows={3}
                            />
                            <ErrorMessage
                                name="description"
                                component="p"
                                className="text-red-400 text-sm"
                            />

                            <label
                                htmlFor="image"
                                className="text-sm block font-bold text-gray-400"
                            >
                                Image
                            </label>
                            <input
                                type="file"
                                name="image"
                                id="image"
                                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
                                onChange={(e) => {
                                    setFieldValue("image", e.target.files[0]);
                                }}
                            />

                            <button
                                type="submit"
                                className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded mt-2 text-white focus:outline-none disabled:bg-indigo-400"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
                                ) : (
                                    "Submit"
                                )}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export { PostForm };
