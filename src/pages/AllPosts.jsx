import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";
import Lottie from "lottie-react";
import puppyAnimation from "../assets/running-puppy.json"; // 🐶 Lottie animation
import { motion } from "framer-motion";

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setTimeout(() => {
                    setPosts(posts.documents);
                    setLoading(false);
                }, 3000); // Simulating API delay for effect
            }
        });
    }, []);

    return (
        <div className="w-full py-8">
            <Container>
                {loading ? (
                    <div className="h-64 flex flex-col justify-center items-center">
                        <Lottie animationData={puppyAnimation} loop className="w-40 h-40" />
                        <div className="mt-4 w-20 h-2 bg-gray-400 rounded animate-ping"></div>
                    </div>
                ) : (
                    <motion.div 
                        className="flex flex-wrap"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {posts.map((post) => (
                            <motion.div 
                                key={post.$id} 
                                className="p-2 w-1/4"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <PostCard {...post} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </Container>
        </div>
    );
}

export default AllPosts;
