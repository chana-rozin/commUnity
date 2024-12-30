"use client";
import { useEffect } from "react";
import { pusherClient } from "@/services/pusher";
import { PostComp } from './Post';
import { usePosts, useLikePost, useSavePost } from '@/services/mutations/forum';
import { NewPostInput } from './NewPostInput';
import Link from 'next/link';
import useUserStore from "@/stores/userStore";
import Loading from "../animations/Loading";

interface ForumPageProps {
  selectedCommunityId?: string;
}

const ForumPage: React.FC<ForumPageProps> = ({ selectedCommunityId }) => {
  const { user, setUser } = useUserStore();
  const communityId = selectedCommunityId || user?.neighborhood._id;
  const { data: posts, isLoading, error, refetch } = usePosts(communityId || "");
  const likeMutation = useLikePost();
  const saveMutation = useSavePost(user, setUser);

  useEffect(() => {
    if (!communityId) return;

    const channel = pusherClient.subscribe(`forum_${communityId}`);
    channel.bind("new-post", () => {
      refetch(); 
    });

    return () => {
      channel.unbind_all();
      pusherClient.unsubscribe(`forum_${communityId}`);
    };
  }, [communityId, refetch]);

  const handleLike = (postId: string, isCurrentlyLiked: boolean) => {
    if (!user?._id) return;
    likeMutation.mutate({ postId, userId: user._id, isCurrentlyLiked });
  };

  const handleSave = (postId: string) => {
    if (!user?._id) return;
    saveMutation.mutate({ postId });
  };

  if (!user) {
    return <div>Loading user...</div>;
  }
  if (isLoading) return <Loading height='low'/>;;
  if (error) return <div>Error loading posts</div>;

  return (
    <div className="flex flex-col min-w-[240px] w-[775px] max-md:max-w-full">
      <NewPostInput  selectedCommunityId={selectedCommunityId}/>
      {posts && posts.length === 0 ? (
        <div>No posts to display.</div>
      ) : (
        posts
          ?.slice() 
          .sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()) 
          .map((post) => (
            <Link key={post._id} href={`/forum/${communityId}/${post._id}`}>
              <PostComp
                creator={post.creator}
                createdDate={post.createdDate}
                content={post.content}
                images={post.images}
                commentCount={post.comments?.length || 0}
                likesCount={post.likedBy?.length || 0}
                liked={post.likedBy?.includes(user._id || "")}
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
