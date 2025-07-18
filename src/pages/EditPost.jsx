import React, { useEffect, useState } from 'react';
import { Container, PostForm } from '../components';
import appwriteService from '../appwrite/config';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function EditPost() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (!slug) {
            navigate('/');
            return;
        }

        // ✅ Ensure userData is available before making API call
        if (!userData) {
            console.log("Waiting for user authentication...");
            return;
        }

        // Fetch the post
        appwriteService.getPost(slug).then((fetchedPost) => {
            if (!fetchedPost) {
                alert("Post not found!");
                navigate('/');
                return;
            }

            // ✅ Ownership Check: Allow only the owner to edit
            if (fetchedPost.userID !== userData.$id) {
                alert("You are not authorized to edit this post.");
                navigate('/');
                return;
            }

            setPost(fetchedPost);
            setLoading(false);
        }).catch((error) => {
            console.error("Error fetching post:", error);
            navigate('/');
        });

    }, [slug, navigate, userData]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return post ? (
        <div className="py-8">
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null;
}

export default EditPost;
