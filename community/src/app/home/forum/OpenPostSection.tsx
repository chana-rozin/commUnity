"use client";
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { pusherClient } from '@/services/pusher';
import { PostComp } from './Post';
import { CommentComp } from './Comment';
import ForumInput from './ForumInput';
import { Post } from '@/types/post.type';
import { Comment } from '@/types/general.type';

const OpenPostSection: React.FC<Post> = ({id,creatorId,createdDate,title,content,comments,likedBy}) => {
  const [allComments, setAllComments] = useState<Comment[]>(comments);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const channel = pusherClient.subscribe('forum');
    channel.bind('new-message', (data: { message: Comment }) =>{
      console.log(data.message);
      setAllComments((prevComments) => [...prevComments, data.message]);
    });
    return () => {
      channel.unbind_all();
      pusherClient.unsubscribe('forum');
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <div className="flex flex-col min-w-[240px] w-[775px] max-md:max-w-full">
        <div className="mb-4">
          <PostComp
            creatorId={creatorId}
            createdDate={createdDate}
            content={content}
            commentCount={comments.length}
            likedBy={likedBy}
            onClick={()=>{}}
          />
        </div>
          <div className="flex flex-col justify-center items-center px-3 mt-4 w-full bg-white rounded-2xl min-h-[434px]">
            <div className="flex flex-col px-0.5 w-full max-w-[737px]">
              {allComments.map((comment) => (
                  <CommentComp
                    key={comment.id}
                    creatorId={comment.creatorId}
                    createdDate={comment.createdDate}
                    content={comment.content}
                  />
                ))}
            </div>
            <ForumInput/>
          </div>
        </div>
  );
};

export default OpenPostSection;