import React, { FC, useState, useEffect } from 'react';
import './room-chat.css';
import { socket } from '@socket/socket';
import { Message } from './message/message';
import { actions } from '@socket/socket-events';

interface iMessage {
  author: string;
  message: string;
};

interface iChatRoom {
  roomId: string;
};

export const RoomChat: FC<iChatRoom> = (roomId) => {
  const [messages, setMessages] = useState<iMessage[]>([]);
  const [text, setText] = useState<string>('');
  useEffect(() => {
    socket.on(actions.newMessage, ({ message, author }) => {
      setMessages((prev) => [...prev, { message, author }]);
      setText('');
      document!.getElementById('chatbox')!.scrollTop = document!.getElementById('chatbox')!.scrollHeight;
    });
  }, []);

  const sendMessage = (message: string) => {
    if (message.trim() !== '') {
      socket.emit(actions.sendMessage, { message, author: socket.id, roomId });
    };
  };

  return (
    <div className='room-chat_shadow'>
      <section className='room-chat' id='chatbox'>
        {messages.map((element, index) => {
          return <Message key={index + element.author} text={element.message} author={element.author} />
        })}
      </section>
      <section className='chat-input'>
        <textarea
          className='chat-input_textarea'
          onKeyDown={(e) => e.keyCode === 13 && sendMessage(text)}
          onChange={(e) => setText(e.target.value)}
          value={text}
        ></textarea>
      </section>
    </div>
  );
};
