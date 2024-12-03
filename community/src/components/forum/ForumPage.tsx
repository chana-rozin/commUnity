"use client";
import React, { useState, useEffect } from 'react';
import { PostComp } from './Post';
import { Post } from '@/types/post.type';
import {getPosts, likePost, savePost} from '@/services/posts';
import {NewPostInput} from './NewPostInput';
import Link from 'next/link';


const ForumPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);


  const fetchPosts = async () => {
    try {
      const response = await getPosts();
      console.log("Fetched posts:", response); // Debugging the response
      setPosts(Array.isArray((response.data)) ? response.data : []);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]);
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      await fetchPosts();
      setLoading(false);
    };
  
    fetchData();
  }, []);

  const handleLike = async (postId:string, creatorId: string) => {
    try {
      const response = await likePost( postId, creatorId);
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.creatorId === creatorId 
            ? { 
                ...post, 
                likesCount: response.data.likesCount 
              } 
            : post
        )
      );
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleSave = async (postId: string) => {
    try {
      await savePost(postId);
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  const selectedPost = posts.find((post) => post._id === selectedPostId);

  return (
    <div className="flex flex-col min-w-[240px] w-[775px] max-md:max-w-full">
    <NewPostInput/>
    {loading ? (
        <div>Loading posts...</div>
      ) : posts.length === 0 ? (
        <div>No posts to display.</div>
      ) : (
        posts.map((post) => (
          <Link key={post._id} href={`/forum/${post._id}`}>
            <div>
              <PostComp
                 creatorId={post.creatorId}
                 createdDate={post.createdDate}
                 content={post.content}
                 commentCount={post.comments.length}
                 likesCount={post.likedBy.length || 0}
                 //liked={post.likedBy.find(userId)}
                 onClick={() => setSelectedPostId(post._id)}
                 onLike={(creatorId) => handleLike(post._id, creatorId)} 
                 onSave={() => handleSave(post._id)}
              />
            </div>
          </Link>
        ))
      )}
    </div>
  );
  
};

export default ForumPage;