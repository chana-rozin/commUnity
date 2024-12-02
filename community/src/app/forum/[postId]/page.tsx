import React from 'react';
import OpenPostSection from '@/components/forum/OpenPostSection';
import { getPostById } from '@/services/posts';

interface PostPageProps {
  params: {
    postId: string;
  }
}

const PostPage: React.FC<PostPageProps> = async ({ params }) => {
  try {
    const { postId } = params;
    // Fetch the specific post using the postId from the route
    const post = await getPostById(postId);

    return (
      <div>
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
  } catch (error) {
    console.error(error);
    return <div>Post not found</div>;
  }
};

export default PostPage;