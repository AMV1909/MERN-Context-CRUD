import { HomePage, PostForm, NotFoundPage } from "./pages";
import { Routes, Route } from "react-router-dom";
import { PostContextProvider } from "./context/PostContext";
import { Toaster } from "react-hot-toast";

function App() {
    return (
        <div className="bg-neutral-900 min-h-screen flex items-center">
            <div className="px-10 container m-auto">
                <PostContextProvider>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/new" element={<PostForm />} />
                        <Route path="/edit/:id" element={<PostForm />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                    <Toaster />
                </PostContextProvider>
            </div>
        </div>
    );
}

export default App;
