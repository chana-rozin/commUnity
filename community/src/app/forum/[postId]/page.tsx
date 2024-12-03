'use client';

import React, { useEffect, useState } from 'react';
import OpenPostSection from '@/components/forum/OpenPostSection';
import { getPostById } from '@/services/posts';
import { useParams } from 'next/navigation'
import { toggleSinglePostLike, toggleSinglePostSave } from '@/services/forumUtils';
import useUserStore from "@/stores/userStore";


const PostPage: React.FC = () => {

  const { postId } = useParams();
  const user = useUserStore((state) => state.user);

  const [post, setPost] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  
  useEffect(() => {
    if (user) {
        const fetchPost = async () => {
            try {
                const fetchedPost = await getPostById(postId as string);
                if (!fetchedPost) {
                throw new Error('Post not found');
                }
                setPost(fetchedPost);
            } catch (err: any) {
                console.error('Error fetching post:', err);
                setError(err.message || 'An error occurred');
            }
        };
        fetchPost();
    }
  }, [postId, user]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!post) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Loading user...</div>;
  }

  const handleLike = async (postId: string, isCurrentlyLiked: boolean): Promise<void> => {
    if (!user?._id) {
      console.error('User not authenticated');
      return;
    }
  
    try {
      await toggleSinglePostLike(postId, user._id, isCurrentlyLiked, setPost);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };
  

  const handleSave = async () => {
    if (!user?._id) {
      console.error('User not authenticated');
      return;
    }
  
    try {
      const isCurrentlySaved = user.savedPostsIds.includes(post._id);
      await toggleSinglePostSave(post._id, user._id, isCurrentlySaved, setPost);
    } catch (error) {
      console.error("Error toggling save:", error);
    }
  };

  return (
    <div className="flex flex-col mt-4 min-w-[240px] w-[775px] max-md:max-w-full">
      <OpenPostSection
        _id={post._id}
        creatorId={post.creatorId}
        createdDate={post.createdDate}
        title={post.title}
        content={post.content}
        comments={post.comments}
        likedBy={post.likedBy}
        communityId="0"
        images={post.images}
        liked={post.likedBy.includes(user._id)}
        saved={user.savedPostsIds.includes(post._id)}
        onLike={(postId, isCurrentlyLiked) => handleLike(postId, isCurrentlyLiked)} // Ensure this matches the prop signature
        onSave={() => handleSave()}        
      />
    </div>
  );
};

export default PostPage;
