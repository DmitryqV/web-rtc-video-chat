import React, { FC } from 'react';
import './room-chat.css';
import { Message } from './message/message';
export const RoomChat: FC = () => {
  return (
    <div className='room-chat_shadow'>
      <section className='room-chat'>
        <Message text='my message Hello world my message Hello worldmy message Hello worldmy message Hello worldmy message Hello world' author='DmitryqV' />
        <Message text='my message Hello world' author='DmitryqV' />
        <Message text='my message Hello world' author='DmitryqV' />
        <Message text='my message Hello world' author='DmitryqV' />
        <Message text='my message Hello world' author='DmitryqV' />
        <Message text='my message Hello world' author='DmitryqV' />
        <Message text='my message Hello world' author='DmitryqV' />
        <Message text='my message Hello world' author='DmitryqV' />
        <Message text='my message Hello world' author='DmitryqV' />
        <Message text='my message Hello world' author='DmitryqV' />
        <Message text='my message Hello world' author='DmitryqV' />
      </section>
      <section className='chat-input'>
        <textarea className='chat-input_textarea'></textarea>
      </section>
    </div>
  );
};
