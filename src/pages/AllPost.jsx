import React,{useState, useEffect} from 'react'
import { container, PostCard } from '../componant'
import appwriteServices from '../appwrite/config'

function AllPost() {

    const [posts, setPosts] =useState ([])

    useEffect(()=> {}, [])
    appwriteServices.getPost([]).then((posts) => {
        if (posts) {
            setPosts(posts.documents)
        }
    })


    return (
        <div className='w-full py-8'>
            <container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
                </container>
        </div>
      )
}

export default AllPost
