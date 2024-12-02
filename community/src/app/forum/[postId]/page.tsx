import React from 'react';
import { Metadata } from 'next';
import OpenPostSection from '@/components/forum/OpenPostSection';
import { getPostById } from '@/services/posts';

type PostPageProps = {
  params: {
    postId: string;
  };
};

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  try {
    const post = await getPostById(params.postId);
    return {
      title: post.title,
      description: post.content.slice(0, 160)
    };
  } catch (error) {
    return {
      title: 'Post Not Found',
      description: 'The requested post could not be found'
    };
  }
}

const PostPage = async ({ params }: PostPageProps) => {
  try {
    const { postId } = params;
    const post = await getPostById(postId);

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
};

export default PostPage;