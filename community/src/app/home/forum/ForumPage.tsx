"use client";
import React, { useState, useEffect } from 'react';
import { PostComp } from './Post';
import { Post } from '@/types/post.type';
import OpenPostSection from "./OpenPostSection";
import {getPosts, likePost} from '@/services/posts';
import {NewPostInput} from './NewPostInput';

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

  const selectedPost = posts.find((post) => post._id === selectedPostId);

  return (
    <div className="flex flex-col min-w-[240px] w-[775px] max-md:max-w-full">
    <NewPostInput/>
      {loading ? (
        <p>Loading posts...</p> // Show a loading message
      ) : posts.length === 0 ? (
        <p>No posts to display.</p> // Handle empty posts
      ) : selectedPostId && selectedPost ? (
        <OpenPostSection
          _id={selectedPost._id}
          creatorId={selectedPost.creatorId}
          createdDate={selectedPost.createdDate}
          title={selectedPost.title}
          content={selectedPost.content}
          comments={selectedPost.comments}
          likedBy={selectedPost.likedBy}
          communityId="0"
          images={selectedPost.images}
        />
      ) : (
        posts.map((post) => (
          <div key={post._id} className="mb-4">
            <PostComp
              creatorId={post.creatorId}
              createdDate={post.createdDate}
              content={post.content}
              commentCount={post.comments.length}
              likesCount={post.likedBy.length || 0}
              onClick={() => setSelectedPostId(post._id)}
              onLike={(creatorId) => handleLike(post._id, creatorId)}           
            />
          </div>
        ))
      )}
    </div>
  );
  
};

export default ForumPage;