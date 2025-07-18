import React, { useEffect, useState } from 'react'; 
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import appwriteService from '../appwrite/config';
import { PostCard } from '../components';
import Particles from './Particles';
import Ballpit from './Ballpit';

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);

    return (
        <Box sx={{ width: '100vw', minHeight: '100vh', background: 'linear-gradient(135deg, #0d0d0d, #00ffcc, #ff00ff)',}}>
            
        {/* Hero Section with Ballpit Animation */}
        <div style={{ position: 'relative', overflow: 'hidden', minHeight: '800px', maxHeight: '500px', width: '100%', background: 'linear-gradient(135deg, #00ffcc, #ff00ff)' }}>
            <Ballpit count={200} gravity={0.7} friction={0.8} wallBounce={0.95} followCursor={true}  colors={['#00ffcc', '#ff00ff', '#ffcc00']}  />
            <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center',  color: 'white', zIndex: 2, }}>
                <Typography padding={26} variant="h3" fontWeight="bold"  sx={{ textShadow: '0 0 10px #00ffcc, 0 0 20px #ff00ff' }}>
                    Welcome to BlogU
                </Typography>
                <Typography variant="h6"   sx={{ 
        fontSize: '1.2rem', // Slightly larger font size
        fontWeight: '500', // Medium weight for readability
        textShadow: '0 0 5px rgba(255, 255, 255, 0.8), 0 0 10px rgba(0, 255, 204, 0.6)', // Neon glow
        color: '#ffffff', // High contrast white text
        maxWidth: '80%', // Prevents text from stretching too wide
         // Improves readability
    }}>
                    Share your thoughts, express yourself, and connect with a vibrant community.
                </Typography>
                <Button 
                    variant="contained" 
                    color="secondary" 
                    sx={{ mt: 4, px: 4, py: 1.5, fontSize: '1rem' , backgroundColor: '#ff00ff', // Neon pink button
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#cc00cc',} }}
                >
                    Login to Explore
                </Button>
            </Box>
        </div>


            {/* About Section */}
            <Box maxWidth="xl" sx={{ mt: 6, textAlign: 'center', p: 6, bgcolor: 'primary.main', color: 'white' }}>
                <Typography variant="h4" fontWeight="bold">
                    Start Blogging Now
                </Typography>
                <Typography variant="body1" mt={2} color="text.secondary">
                    Whether you’re a writer, thinker, or just someone who loves to share ideas, BlogU is the 
                    perfect place for you. Write, connect, and grow with a community that values your voice.
                </Typography>
            </Box>

            {/* Posts Section */}
            <Box maxWidth="xl" sx={{ mt: 6 }}>
                <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
                    Latest Posts
                </Typography>
                <Grid container spacing={3} justifyContent="center">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <Grid item xs={12} sm={6} md={4} key={post.$id}>
                                <PostCard {...post} />
                            </Grid>
                        ))
                    ) : (
                        <Typography variant="body1" textAlign="center" color="text.secondary">
                            No posts available
                        </Typography>
                    )}
                </Grid>
            </Box>
        </Box>
    );
}

export default Home;
