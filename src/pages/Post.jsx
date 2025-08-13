import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);

                navigate("/");
            }
        });
    };
    {console.log("You are inside post")}

    return post ? (
        <div className="py-8 bg-[beige] rounded-3xl flex sm:w-[80vw] w-[380px]">
            <Container>
                <div className="md:flex p-2">
                <div className="w-full flex justify-center mb-4 relative rounded-xl">
                    {console.log(appwriteService.getFileView(post.featuredImage))}
                    <img
                        src={appwriteService.getFileView(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl w-[300px] h-[350px] sm:mt-1 mt-3"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 md:top-[48vh] top-[-40px] my-2">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="p-8">
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
                    </div>
                    </div>
            </Container>
        </div>
    ) : null;
}