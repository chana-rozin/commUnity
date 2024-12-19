import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { likePost, unLikePost, savePost, unSavePost, getPosts, getPostsByCommunityId } from '@/services/posts';
import { Post } from '@/types/post.type';
import { User } from "@/types/user.type";  
import { Comment } from '@/types/general.type';
import http from '../http';

// export const usePosts = () => {
//   return useQuery<Post[]>({ queryKey: ['posts'], queryFn: async () => {
//       const response = await getPosts();
//       return Array.isArray(response.data) ? response.data : [];
//     },
//     retry: 1,
//   });
// };

export const usePosts = (communityId: string) => {
  return useQuery<Post[]>({
    queryKey: ['posts', communityId], 
    queryFn: () => getPostsByCommunityId(communityId), 
    retry: 1,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation<Post, Error, Partial<Post>>({
    mutationFn: async (postData) => {
      // Notify via Pusher
      await http.post('/pusher/send', {
        channel: `forum_${postData?.communitiesIds ? postData?.communitiesIds[0] : ''}`,
        event: 'new-message',
        message: postData,
      });

      const response = await http.post('/posts', postData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (error) => {
      console.error('Failed to create post:', error);
    },
  });
};

export const useCreateComment = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation<void,Error,{ postId: string; newComment: Comment }>({
    mutationFn: async ({ postId, newComment }) => {
      // Notify via Pusher
      await http.post('/pusher/send', {
        channel: `forum_${postId}`,
        event: 'new-message',
        message: newComment,
      });

      // Send the comment to the backend
      await http.post(`/posts/${postId}/comments`, newComment);
    },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      },
    }
  );
};


interface LikeContext {
  previousPosts?: Post[];
}
export const useLikePost = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, { postId: string, userId: string, isCurrentlyLiked: boolean }, LikeContext>({
    mutationFn: async ({ postId, userId, isCurrentlyLiked }) => {
      return isCurrentlyLiked 
        ? await unLikePost(postId, userId)
        : await likePost(postId, userId);
    },
    onMutate: async ({ postId, userId, isCurrentlyLiked }) => {
      await queryClient.cancelQueries({ queryKey: ['posts'] });
      const previousPosts = queryClient.getQueryData<Post[]>(['posts']);

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
      return { previousPosts };
    },
    onError: (err, variables, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(['posts'], context.previousPosts);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    }
  });
};

interface SaveContext {
  previousPosts?: Post[];
  previousSavedPosts?: string[];
}
export const useSavePost = (user: User | null, setUser: (user: User) => void) => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, { postId: string }, SaveContext>({
    mutationFn: async ({ postId }) => {
      const isCurrentlySaved = user?.savedPostsIds.includes(postId);
      
      return isCurrentlySaved 
        ? await savePost(user!._id || "", postId)
        : await unSavePost(user!._id || "", postId);
    },
    onMutate: async ({ postId }) => {
      await queryClient.cancelQueries({ queryKey: ['posts'] });
      const previousPosts = queryClient.getQueryData<Post[]>(['posts']);
      const previousSavedPosts = user?.savedPostsIds || [];

      const updatedSavedPosts = previousSavedPosts.includes(postId)
        ? previousSavedPosts.filter(id => id !== postId)
        : [...previousSavedPosts, postId];

      if (user) {
        setUser({
          ...user,
          savedPostsIds: updatedSavedPosts
        });
      }

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
      if (context?.previousSavedPosts && user) {
        setUser({
          ...user,
          savedPostsIds: context.previousSavedPosts
        });
      }

      if (context?.previousPosts) {
        queryClient.setQueryData(['posts'], context.previousPosts);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    }
  });
};

