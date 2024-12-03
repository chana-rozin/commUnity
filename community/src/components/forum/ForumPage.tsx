"use client";
import React, { useState, useEffect } from 'react';
import { PostComp } from './Post';
import { Post } from '@/types/post.type';
import { fetchPosts, toggleLikePost, savePostHandler } from '@/services/forumUtils';
import { NewPostInput } from './NewPostInput';
import Link from 'next/link';
import useUserStore from "@/stores/userStore";

const ForumPage: React.FC = () => {
  const user = useUserStore((state) => state.user);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only fetch posts if user is loaded
    if (user) {
      const fetchData = async () => {
        try {
          const fetchedPosts = await fetchPosts();
          setPosts(fetchedPosts);
        } catch (error) {
          console.error("Failed to fetch posts:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [user]); // Correct dependency array

  const handleLike = async (postId: string, isCurrentlyLiked: boolean): Promise<void> => {
    if (!user?._id) return;
    
    try {
      await toggleLikePost(postId, user._id, isCurrentlyLiked, setPosts);
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  };

  const handleSave = async (postId: string) => {
    if (!user?._id) return;
    
    try {
      await savePostHandler(postId);
    } catch (error) {
      console.error("Failed to save post:", error);
    }
  };

  // Early return if user is not loaded
  if (!user) {
    return <div>Loading user...</div>;
  }

  return (
    <div className="flex flex-col min-w-[240px] w-[775px] max-md:max-w-full">
      <NewPostInput />
      {loading ? (
        <div>Loading posts...</div>
      ) : posts.length === 0 ? (
        <div>No posts to display.</div>
      ) : (
        posts.map((post) => (
          <Link key={post._id} href={`/forum/${post._id}`}>
            <PostComp
              creatorId={post.creatorId}
              createdDate={post.createdDate}
              content={post.content}
              commentCount={post.comments.length}
              likesCount={post.likedBy.length || 0}
              liked={post.likedBy.includes(user._id)}
              saved={user.savedPostsIds.includes(post._id)}
              onLike={(isLiked) => handleLike(post._id, isLiked)}
              onSave={() => handleSave(post._id)}
            />
          </Link>
        ))
      )}
    </div>
  );
};

export default ForumPage;