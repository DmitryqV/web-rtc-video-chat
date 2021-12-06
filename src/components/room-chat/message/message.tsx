import React, { FC } from 'react';
import './message.css';

interface iMessage {
  text: string;
  author: string;
};

export const Message: FC<iMessage> = ({ text, author }) => {
  return (
    <div className='message'>
      <div className='message-author_img'></div>
      <div className='message-content'>
        <p className='message-author'>{author}</p>
        <p>{text}</p>
      </div>
    </div>
  );
};
