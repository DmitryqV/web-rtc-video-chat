import React, { FC } from 'react';
import { AudioController, VideoController } from './user-access.script';
export const UserAcccess: FC = () => {
  return (
    <>
      <section className='user-view'>
        <img className='user-avatar' src='https://avatars.githubusercontent.com/u/67154333?v=4' alt='Creator by DmitryqV' />
        <a href='https://github.com/DmitryqV' className='user-name'>
          DmitryqV
        </a>
      </section>
      <section className='room-settings'>
        <div className='room-settings__item camera' onClick={VideoController}>
          <svg width='32' height='32' fill='white' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'>
            <g clipPath='url(#clip0_3:28)'>
              <path d='M18.1007 6.59955H3.50109C1.57549 6.59955 0 8.17504 0 10.1006V21.8993C0 23.8249 1.57549 25.4004 3.50109 25.4004H18.1007C20.0263 25.4004 21.6018 23.8249
                21.6018 21.8993V10.1006C21.6018 8.14003 20.0263 6.59955 18.1007 6.59955Z'
              />
              <path d='M29.4092 8.5252C29.1991 8.56021 28.9891 8.66525 28.814 8.77028L23.3523 11.9213V20.0438L28.849 23.1948C29.8643 23.79 31.1247 23.4399 31.7199 22.4245C31.895
                22.1094 32 21.7593 32 21.3742V10.5558C32 9.26043 30.7746 8.21011 29.4092 8.5252Z'
              />
            </g>
            <defs>
              <clipPath id='clip0_3:28'>
                <rect width='32' height='32' />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className='room-settings__item microphone' onClick={AudioController}>
          <svg width='32' height='32' fill='#15C8FF' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'>
            <path d='M26.24 16.5271C26.24 15.8871 25.7506 15.3976 25.1106 15.3976C24.4706 15.3976 23.9812 15.8871 23.9812 16.5271C23.9812 20.9318 20.4047 24.5082 16 24.5082C11.5953
              24.5082 8.01883 20.9318 8.01883 16.5271C8.01883 15.8871 7.52941 15.3976 6.88941 15.3976C6.24941 15.3976 5.76 15.8871 5.76 16.5271C5.76 21.76 9.6753 26.1647 14.8706
              26.7294V29.7412H10.7671C10.1271 29.7412 9.63765 30.2306 9.63765 30.8706C9.63765 31.5106 10.1271 32 10.7671 32H21.2329C21.8729 32 22.3624 31.5106 22.3624
              30.8706C22.3624 30.2306 21.8729 29.7412 21.2329 29.7412H17.1294V26.7294C22.3247 26.1647 26.24 21.76 26.24 16.5271Z'
            />
            <path d='M16 0C12.5365 0 9.71294 2.82353 9.71294 6.28706V16.4894C9.71294 19.9906 12.5365 22.7765 16 22.8141C19.4635 22.8141 22.2871 19.9906 22.2871 16.5271V6.28706C22.2871
              2.82353 19.4635 0 16 0Z'
            />
          </svg>
        </div>
      </section>
    </>
  );
};
