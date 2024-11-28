"use client";
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { PostComp } from './Post';
import { Post } from '@/types/post.type';
import OpenPostSection from "./OpenPostSection";

const initialDiscussions: Post[] = [
  {
    _id: "123",
    creatorId: 'חני רוזין',
    communityId: '',
    createdDate: new Date(),
    title: 'שלום לכולם!',
    content: 'דיון מאוד חשוב\nעל דברים ברומו של עולם\nמה דעתכם?',
    images: [],
    comments: [
      {
        _id: 'comment1',
        creatorId: 'טלי',
        content: 'צודקת',
        createdDate: new Date(),
        likedBy: [],
      },
    ],
    likedBy: [],
  },

  {
    _id: "1234",
    creatorId: 'חני רוזין',
    communityId: '',
    createdDate: new Date(),
    title: 'שלום לכולם!',
    content: '0000000000000דיון מאוד חשוב\nעל דברים ברומו של עולם\nמה דעתכם?',
    images: [],
    comments: [
      {
        _id: 'comment15',
        creatorId: 'טלי',
        content: 'צודקת',
        createdDate: new Date(),
        likedBy: [],
      },
    ],
    likedBy: [],
  },
];

const ForumPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(initialDiscussions);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [posts]);

  return (
    <div className="flex flex-col min-w-[240px] w-[775px] max-md:max-w-full">
      {selectedPostId ? (
        <OpenPostSection
          _id={posts[0]._id}
          creatorId={posts[0].creatorId}
          createdDate={posts[0].createdDate}
          title={posts[0].title}
          content={posts[0].content}
          comments={posts[0].comments}
          likedBy={posts[0].likedBy}
          communityId='0'
          images={posts[0].images}
        />
      ) : (
        // Otherwise, display the list of posts
        posts.map((post) => (
          <div key={post._id} className="mb-4">
            <PostComp
              creatorId={post.creatorId}
              createdDate={post.createdDate}
              content={post.content}
              commentCount={post.comments.length}
              likedBy={post.likedBy}
              onClick={() => setSelectedPostId(post._id)} // Set the selected post ID
            />
          </div>
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ForumPage;