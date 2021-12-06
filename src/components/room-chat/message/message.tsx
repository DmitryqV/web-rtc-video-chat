import React, { FC } from 'react';
import { socket } from '@socket/socket';
import './message.css';

interface iMessage {
  text: string;
  author: string;
};

export const Message: FC<iMessage> = ({ text, author }) => {
  return (
    <div className='message' style={socket.id === author ? { backgroundColor: '#15c8ff3d' } : { backgroundColor: '#f9f9f9' }}>
      <div className='message-author_img'></div>
      <div className='message-content'>
        <p className='message-author'>{author} {socket.id === author && ' (ME)'}</p>
        <p className='message-text'>{text}</p>
      </div>
    </div>
  );
};
