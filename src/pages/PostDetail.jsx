import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Container, Card, CardContent, CardMedia, Typography, IconButton, CircularProgress } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material"; // Material-UI Icons
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/config";

function PostDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((data) => {
        if (data) {
          setPost(data);
        } else {
          navigate("/"); // Redirect if post not found
        }
        setLoading(false);
      });
    }
  }, [slug, navigate]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (confirmDelete) {
      const deleted = await appwriteService.deletePost(slug);
      if (deleted) {
        navigate("/"); // Redirect after delete
      }
    }
  };

  if (loading) return <CircularProgress sx={{ display: "block", margin: "auto", mt: 4 }} />;
  if (!post) return <Typography variant="h6" color="error">Post not found!</Typography>;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
        {/* Post Image */}
        {post.featuredimage && (
          <CardMedia
            component="img"
            height="300"
            image={appwriteService.getFilePreview(post.featuredimage)}
            alt={post.title}
            sx={{ borderRadius: "8px 8px 0 0" }}
          />
        )}

        <CardContent>
          {/* Post Title */}
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {post.title}
          </Typography>

          {/* Post Content */}
          <Typography variant="body1" sx={{ mt: 2 }}>
            {post.content}
          </Typography>

          {/* Edit & Delete Buttons (Only for Post Owner) */}
          {userData?.$id === post.userID && (
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
              {/* Edit Button */}
             

              {/* Delete Button */}
              <IconButton onClick={handleDelete} color="error">
                <Delete />
              </IconButton>
            </div>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}

export default PostDetail;
