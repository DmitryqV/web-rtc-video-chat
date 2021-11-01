import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './notfound.css';

export const NotFoundPage: FC = () => {
  return (
    <section className='notfound-class'>
      <h2 className='notfound-title'>page not found!</h2>
      <Link to='/'>
        <button className='notfound-btn'>
          Go back
        </button>
      </Link>
    </section>
  );
};
