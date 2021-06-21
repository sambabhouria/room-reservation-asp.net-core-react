import React from 'react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <div className='pick'>
    <Link id='look' to="/look">
      <span className='text'>
        <span className='heading'>AGENDA</span>
        <span>Upcoming Events</span>
        <i className='icon'></i>
      </span>
    </Link>
    <Link id='book' to="/rooms">
      <span className='text'>
        <span className='heading'>SALLES</span>
        <span>List of Rooms</span>
        <i className='icon'></i>
      </span>
    </Link>
  </div>
);
