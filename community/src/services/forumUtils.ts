import { likePost, unLikePost, savePost, unSavePost, getPosts } from '@/services/posts';
import { Post } from '@/types/post.type';
import React from 'react';
import { User } from "@/types/user.type";  

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

export const toggleSavePost = async (
    postId: string,
    userId: string,
    isCurrentlySaved: boolean,
    user: User | null,
    setUser: (user: User) => void,
    updatePostState: React.Dispatch<React.SetStateAction<Post[]>>
  ) => {
    try {
      if (isCurrentlySaved) {
        await unSavePost(userId,postId);
        setUser({...user!, savedPostsIds: user!.savedPostsIds.filter((id)=> id!==postId)})
        updatePostState((prevPosts) => 
          prevPosts.map((post) =>
            post._id === postId ? { ...post, saved: false } : post
          )
        );
      } else {
        await savePost(userId,postId);
        setUser({...user!, savedPostsIds: [...(user!.savedPostsIds), postId]})
        updatePostState((prevPosts) => 
          prevPosts.map((post) =>
            post._id === postId ? { ...post, saved: true } : post
          )
        );
      }
    } catch (error) {
      console.error('Error toggling save:', error);
    }
  };
  
  export const toggleSinglePostSave = async (
    postId: string,
    userId: string,
    isCurrentlySaved: boolean,
    user: User | null,
    setUser: (user: User) => void,
    updatePostState: React.Dispatch<React.SetStateAction<Post | null>>
  ) => {
    try {
      if (isCurrentlySaved) {
        await unSavePost(userId,postId);
        setUser({...user!, savedPostsIds: user!.savedPostsIds.filter((id)=> id!==postId)})
        updatePostState((prevPost) => 
          prevPost && prevPost._id === postId
            ? { ...prevPost, saved: false }
            : prevPost
        );
      } else {
        await savePost(userId,postId);
        setUser({...user!, savedPostsIds: [...(user!.savedPostsIds), postId]})
        updatePostState((prevPost) => 
          prevPost && prevPost._id === postId
            ? { ...prevPost, saved: true }
            : prevPost
        );
      }
    } catch (error) {
      console.error('Error toggling save:', error);
    }
  };