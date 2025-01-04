"use client";
import { useState, useEffect } from "react";
import pusherClient from "@/services/pusher";
import { PostComp } from './Post';
import { usePosts, useLikePost, useSavePost } from '@/services/mutations/forum';
import { getPostById } from '@/services/posts';
import { NewPostInput } from './NewPostInput';
import Link from 'next/link';
import useUserStore from "@/stores/userStore";
import { Post } from '@/types/post.type';
import Loading from "../animations/Loading";

interface ForumPageProps {
  selectedCommunityId?: string;
  saved?: boolean;
}

const ForumPage: React.FC<ForumPageProps> = ({ selectedCommunityId, saved }) => {
  const { user, setUser } = useUserStore();
  const communityId = selectedCommunityId || user?.neighborhood._id;
  const [posts, setPosts] = useState<Post[] | undefined>(undefined);
  const { data: communityPosts, isLoading, error, refetch } = usePosts(communityId || "");
  const likeMutation = useLikePost();
  const saveMutation = useSavePost(user, setUser);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      if (saved && user?.savedPostsIds) {
        const fetchedPosts = await Promise.all(user.savedPostsIds.map(postId => getPostById(postId)));
        setPosts(fetchedPosts);
      }
    };

    if (saved) {
      fetchSavedPosts();
    } else {
      if (!communityId) return;

      setPosts(communityPosts);

      const channel = pusherClient.subscribe(`forum_${communityId}`);
      channel.bind("new-post", () => {
        refetch();
      });

      return () => {
        channel.unbind_all();
        pusherClient.unsubscribe(`forum_${communityId}`);
      };
    }
  }, [communityId, refetch, saved, user, communityPosts]);

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
  if (isLoading) return <Loading height="low" />;
  if (error) return <div>Error loading posts</div>;

  return (
    <div className="flex flex-col flex-grow min-w-[240px] w-full max-md:max-w-full">
      {!saved && <NewPostInput selectedCommunityId={selectedCommunityId} />}
      {posts && posts.length === 0 ? (
        <div className="flex-grow flex items-center justify-center text-gray-500 mt-8">
          {saved ? "אין לך עדיין פוסטים שמורים.." : "בקהילה זו לא נוספו עוד פוסטים😕"}
        </div>
      ) : (
        <div className="flex flex-col flex-grow overflow-auto">
          {posts
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
            ))}
        </div>
      )}
    </div>
  );
};

export default ForumPage;
