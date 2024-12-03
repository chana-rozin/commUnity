import { likePost, unLikePost, savePost, getPosts } from '@/services/posts';
import { Post } from '@/types/post.type';
import React from 'react';

export const fetchPosts = async (): Promise<Post[]> => {
  try {
    const response = await getPosts();
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

export const toggleLikePost = async (
  postId: string,
  userId: string,
  isCurrentlyLiked: boolean,
  updatePostState: React.Dispatch<React.SetStateAction<Post[]>>
) => {
  try {
    if (isCurrentlyLiked) {
      const response = await unLikePost(postId, userId);
      updatePostState((prevPosts) => 
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                likedBy: post.likedBy.filter((id) => id !== userId),
                likesCount: response.data.likesCount,
              }
            : post
        )
      );
    } else {
      const response = await likePost(postId, userId);
      updatePostState((prevPosts) => 
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                likedBy: [...post.likedBy, userId],
                likesCount: response.data.likesCount,
              }
            : post
        )
      );
    }
  } catch (error) {
    console.error('Error toggling like:', error);
  }
};

// Separate function for single post updates
export const toggleSinglePostLike = async (
  postId: string,
  userId: string,
  isCurrentlyLiked: boolean,
  updatePostState: React.Dispatch<React.SetStateAction<Post | null>>
) => {
  try {
    if (isCurrentlyLiked) {
      const response = await unLikePost(postId, userId);
      updatePostState((prevPost) => 
        prevPost && prevPost._id === postId
          ? {
              ...prevPost,
              likedBy: prevPost.likedBy.filter((id) => id !== userId),
              likesCount: response.data.likesCount,
            }
          : prevPost
      );
    } else {
      const response = await likePost(postId, userId);
      updatePostState((prevPost) => 
        prevPost && prevPost._id === postId
          ? {
              ...prevPost,
              likedBy: [...prevPost.likedBy, userId],
              likesCount: response.data.likesCount,
            }
          : prevPost
      );
    }
  } catch (error) {
    console.error('Error toggling like:', error);
  }
};

export const savePostHandler = async (postId: string) => {
  try {
    await savePost(postId);
  } catch (error) {
    console.error('Error saving post:', error);
  }
};