'use client';

import React, { useEffect, useState } from 'react';
import OpenPostSection from '@/components/forum/OpenPostSection';
import { getPostById } from '@/services/posts';
import { useParams } from 'next/navigation'


const PostPage: React.FC = () => {

  const { postId } = useParams();

  const [post, setPost] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
  }, [postId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!post) {
    return <div>Loading...</div>;
  }

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
      />
    </div>
  );
};

export default PostPage;
