import { useContext } from "react";
import { PostContext } from "../context/PostContext";
import { VscEmptyWindow } from "react-icons/vsc";
import { Link, link } from "react-router-dom";
import { PostCard } from "../components/PostCard.js";

function HomePage() {
    const { posts } = useContext(PostContext);

    if (posts.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center">
                <VscEmptyWindow className="w-48 h-48 text-white" />
                <h1 className="text-white text-2xl">There are no posts</h1>
            </div>
        );
    }

    return (
        <div className="text-white">
            <Link to="/new">Create New Posts</Link>

            <div className="grid grid-cols-3 gap-2">
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
}

export { HomePage };
