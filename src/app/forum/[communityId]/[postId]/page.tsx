'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import OpenPostSection from '@/components/Forum/OpenPostSection';
import { getPostById } from '@/services/posts';
import { Post } from '@/types/post.type';
import { useParams } from 'next/navigation';
import { useLikePost, useSavePost } from '@/services/mutations/forum';
import useUserStore from "@/stores/userStore";
import Loading from '@/components/animations/Loading';

const PostPage: React.FC = () => {
  const { postId } = useParams();
  const {user, setUser} = useUserStore();

  const { data: post, isLoading, isError, error } = useQuery<Post>({
    queryKey: ['post', postId],
    queryFn: () => getPostById(postId as string),
    enabled: !!user && !!postId,
  });

  const likeMutation = useLikePost();
  const saveMutation = useSavePost(user, setUser);

  const handleLike = () => {
    if (!user?._id || !post) {
      console.error('User not authenticated or no post');
      return;
    }

    const isCurrentlyLiked = post.likedBy.includes(user._id);
    
    try {
      likeMutation.mutate({ postId: post._id, userId: user._id, isCurrentlyLiked });
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };
  

  const handleSave = () => {
    if (!user?._id || !post) {
      console.error('User not authenticated or no post');
      return;
    }

    try {
      saveMutation.mutate({ postId: post._id });
    } catch (error) {
      console.error("Error toggling save:", error);
    }
  };

  if (isLoading) return <Loading height="low"/>;;
  if (isError) return <div>Error: {error instanceof Error ? error.message : 'An error occurred'}</div>;
  if (!user) return <div>Loading user...</div>;
  if (!post) return <div>No post found</div>;

  return (
    <div className="flex flex-wrap gap-4 items-start w-full flex-grow">
      <OpenPostSection
        _id={post._id}
        creator={post.creator}
        createdDate={post.createdDate}
        title={post.title}
        content={post.content}
        comments={post.comments}
        likedBy={post.likedBy}
        communitiesIds={post.communitiesIds}
        images={post.images}
        liked={post.likedBy.includes(user._id || "")}
        saved={user.savedPostsIds.includes(post._id)}
        onLike={() => handleLike()} 
        onSave={() => handleSave()}        
      />
    </div>
  );
};

export default PostPage;
