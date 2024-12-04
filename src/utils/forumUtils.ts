import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { likePost, unLikePost, savePost, unSavePost, getPosts } from '@/services/posts';
import { Post } from '@/types/post.type';
import { User } from "@/types/user.type";  

export const usePosts = () => {
  return useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await getPosts();
      return Array.isArray(response.data) ? response.data : [];
    },
    retry: 1,
  });
};

interface LikeContext {
  previousPosts?: Post[];
}
// Custom hook for liking/unliking a post
export const useLikePost = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, { postId: string, userId: string, isCurrentlyLiked: boolean }, LikeContext>({
    mutationFn: async ({ postId, userId, isCurrentlyLiked }) => {
      return isCurrentlyLiked 
        ? await unLikePost(postId, userId)
        : await likePost(postId, userId);
    },
    onMutate: async ({ postId, userId, isCurrentlyLiked }) => {
      // Cancel any ongoing refetches
      await queryClient.cancelQueries({ queryKey: ['posts'] });

      // Snapshot the previous value
      const previousPosts = queryClient.getQueryData<Post[]>(['posts']);

      // Optimistically update
      queryClient.setQueryData(['posts'], (oldPosts: Post[] | undefined) => 
        oldPosts?.map(post => 
          post._id === postId 
            ? {
                ...post,
                likedBy: isCurrentlyLiked 
                  ? post.likedBy.filter(id => id !== userId)
                  : [...post.likedBy, userId]
              }
            : post
        ) || []
      );

      // Return a context object with the snapshotted value
      return { previousPosts };
    },
    onError: (err, variables, context) => {
      // If the mutation fails, use the context to rollback
      if (context?.previousPosts) {
        queryClient.setQueryData(['posts'], context.previousPosts);
      }
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    }
  });
};

interface SaveContext {
  previousPosts?: Post[];
  previousSavedPosts?: string[];
}

// Custom hook for saving/unsaving a post
export const useSavePost = (user: User | null, setUser: (user: User) => void) => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, { postId: string }, SaveContext>({
    mutationFn: async ({ postId }) => {
      const isCurrentlySaved = user?.savedPostsIds.includes(postId);
      
      return isCurrentlySaved 
        ? await savePost(user!._id, postId)
        : await unSavePost(user!._id, postId);
    },
    onMutate: async ({ postId }) => {
      // Cancel any ongoing refetches
      await queryClient.cancelQueries({ queryKey: ['posts'] });

      // Snapshot the previous value
      const previousPosts = queryClient.getQueryData<Post[]>(['posts']);
      const previousSavedPosts = user?.savedPostsIds || [];

      // Optimistically update user's saved posts
      const updatedSavedPosts = previousSavedPosts.includes(postId)
        ? previousSavedPosts.filter(id => id !== postId)
        : [...previousSavedPosts, postId];

      // Update user store
      if (user) {
        setUser({
          ...user,
          savedPostsIds: updatedSavedPosts
        });
      }

      // Optimistically update posts
      queryClient.setQueryData(['posts'], (oldPosts: Post[] | undefined) => 
        oldPosts?.map(post => 
          post._id === postId 
            ? { ...post, saved: !previousSavedPosts.includes(postId) }
            : post
        ) || []
      );

      return { previousPosts, previousSavedPosts };
    },
    onError: (err, variables, context) => {
      // Rollback user saved posts if mutation fails
      if (context?.previousSavedPosts && user) {
        setUser({
          ...user,
          savedPostsIds: context.previousSavedPosts
        });
      }

      // Rollback posts
      if (context?.previousPosts) {
        queryClient.setQueryData(['posts'], context.previousPosts);
      }
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    }
  });
};

