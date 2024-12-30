"use client";
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { pusherClient } from '@/services/pusher';
import { PostComp } from './Post';
import { CommentComp } from './Comment';
import NewCommentInput from './NewCommentInput';
import { Post } from '@/types/post.type';
import { Comment } from '@/types/general.type';

interface OpenPostSectionProps extends Post {
  liked: boolean;
  saved: boolean;
  onLike: (postId: string, isCurrentlyLiked: boolean) => void;
  onSave: (postId: string) => void;
}

const OpenPostSection: React.FC<OpenPostSectionProps> = ({ _id, creator, createdDate, liked,
  saved, content, comments, images, likedBy, onLike, onSave,
}) => {
  const [allComments, setAllComments] = useState<Comment[]>(comments);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const channel = pusherClient.subscribe(`forum_${_id}`);
    channel.bind('new-message', (data: { message: Comment }) => {
      console.log(data.message);
      setAllComments((prevComments) => [...prevComments, data.message]);
    });
    return () => {
      channel.unbind_all();
      pusherClient.unsubscribe(`forum_${_id}`);
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <div className="flex flex-col flex-grow min-w-[240px] w-full max-md:max-w-full">
      <PostComp
        creator={creator}
        createdDate={createdDate}
        content={content}
        images={images}
        commentCount={comments?.length || 0}
        likesCount={likedBy?.length || 0}
        liked={liked}
        saved={saved}
        onLike={(isLiked) => onLike(_id, isLiked)}
        onSave={() => onSave(_id)}
      />
      <div className="flex flex-col justify-between items-start px-3 mt-4 w-full bg-white rounded-2xl min-h-[20px]">
        <div className="flex flex-col px-0.5 w-full max-w-[737px]">
          {allComments.length > 0 ? (
            allComments.map((comment, index) => (
              <CommentComp
                key={comment._id}
                creator={comment.creator}
                createdDate={comment.createdDate}
                content={comment.content}
                previousDate={index > 0 ? allComments[index - 1].createdDate : undefined}
              />
            ))
          ) : (
            <div className="text-center text-gray-500 mt-8">
              היה הראשון להוסיף תגובה:)
            </div>
          )}
        </div>
        <NewCommentInput postId={_id} />
      </div>
    </div>
  );
};

export default OpenPostSection;