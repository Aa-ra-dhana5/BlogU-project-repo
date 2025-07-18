import React from "react";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react"; // Import trash icon
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/config";

function PostCard({ $id, title, featuredimage, userID }) {
    const userData = useSelector((state) => state.auth.userData);
    const isOwner = userData?.$id === userID; // Check if logged-in user is the owner

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            const deleted = await appwriteService.deletePost($id);
            if (deleted) {
                alert("Post deleted successfully!");
                window.location.reload(); // Refresh posts after deletion
            } else {
                alert("Failed to delete the post.");
            }
        }
    };

    return (
        <div className="relative w-full bg-gray-100 text-black rounded-xl p-4 shadow-lg">
            {/* Delete Icon (Only for Post Owner) */}
            {isOwner && (
                <button 
                    onClick={handleDelete} 
                    className="absolute top-2 right-2 p-2 bg-gray-200 rounded-full hover:bg-red-500 hover:text-white transition"
                >
                    <Trash2 size={18} />
                </button>
            )}

            {/* Post Image */}
            <Link to={`/post/${$id}`}>
                <div className="w-full justify-center mb-4">
                    {featuredimage ? (
                        <img
                            src={appwriteService.getFilePreview(featuredimage)}
                            alt={title}
                            className="rounded-xl object-cover w-full h-40"
                        />
                    ) : (
                        <p className="text-gray-500">No image available</p>
                    )}
                </div>
            </Link>

            {/* Post Title */}
            <h2 className="text-xl font-bold">{title}</h2>
        </div>
    );
}

export default PostCard;
