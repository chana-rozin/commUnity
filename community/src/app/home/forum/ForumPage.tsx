"use client"
import { useEffect, useState, useRef } from 'react';
import { pusherClient } from '@/services/pusher';
import { PostComp } from './Post';
import { CommentComp } from './Comment';
import ForumInput from './ForumInput';
import { Post } from '@/types/post.type';

const initialDiscussions: Post[] = [
    {
        id: "123",
        creatorId: 'חני רוזין',
        communityId: '',
        createdDate: new Date(),
        title: 'שלום לכולם!',
        content: 'דיון מאוד חשוב\nעל דברים ברומו של עולם\nמה דעתכם?',
        images: [],
        comments: [
            {
                id: 'comment1',
                creatorId: 'טלי',
                content: 'צודקת',
                createdDate: new Date(),
                likedBy: [],
            }
        ],
        likedBy: [],  
    }
]; 

const ForumPage = () => {
  const [posts, setPosts] = useState<Post[]>(initialDiscussions);
  
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const channel = pusherClient.subscribe('forum');

    channel.bind('new-message', (data: { message: Post }) => {
        setPosts((prev) => [...prev, data.message]);
    });

    return () => {
      channel.unbind_all();
      pusherClient.unsubscribe('forum');
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [posts]);

  return (
    <div className="flex flex-col min-w-[240px] w-[775px] max-md:max-w-full">
      {/* Header content remains the same */}

      {posts.map((post) => (
        <div key={post.id} className="mb-4">
          <PostComp 
            creatorId={post.creatorId}
            createdDate={post.createdDate}
            content={post.content}
            commentCount={post.comments.length}
            likedBy={post.likedBy}
          />

          <div className="flex flex-col justify-center items-center px-3 mt-4 w-full bg-white rounded-2xl min-h-[434px]">
            <div className="flex flex-col px-0.5 w-full max-w-[737px]">
              {post.comments.map((comment) => (
                <CommentComp
                  key={comment.id}
                  creatorId={comment.creatorId}
                  createdDate={comment.createdDate}
                  content={comment.content} 
                />
              ))}
            </div>
          </div>
        </div>
      ))}

      <ForumInput />
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ForumPage;