'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import OpenPostSection from '@/components/forum/OpenPostSection';
import { getPostById } from '@/services/posts';
import { Post } from '@/types/post.type';
import { useParams } from 'next/navigation'
import { useLikePost, useSavePost } from '@/services/forumUtils';
import useUserStore from "@/stores/userStore";


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

  //const [post, setPost] = useState<any>(null);
  //const [error, setError] = useState<string | null>(null);

  
  // useEffect(() => {
  //   if (user) {
  //       const fetchPost = async () => {
  //           try {
  //               const fetchedPost = await getPostById(postId as string);
  //               if (!fetchedPost) {
  //               throw new Error('Post not found');
  //               }
  //               setPost(fetchedPost);
  //           } catch (err: any) {
  //               console.error('Error fetching post:', err);
  //               setError(err.message || 'An error occurred');
  //           }
  //       };
  //       fetchPost();
  //   }
  // }, [postId, user]);

  // if (error) {
  //   return <div>{error}</div>;
  // }

  // if (!post) {
  //   return <div>Loading...</div>;
  // }

  // if (!user) {
  //   return <div>Loading user...</div>;
  // }

  const handleLike = () => {
    if (!user?._id || !post) {
      console.error('User not authenticated or no post');
      return;
    }

    const isCurrentlyLiked = post.likedBy.includes(user._id);
    
    try {
      likeMutation.mutate({ 
        postId: post._id, 
        userId: user._id, 
        isCurrentlyLiked 
      });
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

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error instanceof Error ? error.message : 'An error occurred'}</div>;
  if (!user) return <div>Loading user...</div>;
  if (!post) return <div>No post found</div>;

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
        onLike={() => handleLike()} // Ensure this matches the prop signature
        onSave={() => handleSave()}        
      />
    </div>
  );
};

export default PostPage;
