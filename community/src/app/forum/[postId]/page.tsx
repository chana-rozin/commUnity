import React from 'react';
import { Metadata } from 'next';
import OpenPostSection from '@/components/forum/OpenPostSection';
import { getPostById } from '@/services/posts';

// Explicitly define the type for params
export interface Params {
  postId: string;
}

// Explicitly define the Page Props type
export interface PostPageProps {
  params: Params;
}

// Optional: Metadata generation
export async function generateMetadata({ 
  params 
}: PostPageProps): Promise<Metadata> {
  try {
    const post = await getPostById(params.postId);
    return {
      title: post.title,
      description: post.content?.slice(0, 160)
    };
  } catch (error) {
    return {
      title: 'Post Not Found',
      description: 'Unable to load post'
    };
  }
}

// Use async function with explicit typing
export default async function PostPage({ params }: PostPageProps) {
  try {
    const post = await getPostById(params.postId);

    return (
      <div>
        <OpenPostSection 
          _id={post.id} 
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
  } catch (error) {
    console.error(error);
    return <div>Post not found</div>;
  }
}