import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const OneMeeting = ({id, roomName, roomId, title, host, timeStart, timeEnd, status, isHost, toggleMeetingStatus}) => (
  <div className={`meeting ${status ? 'occupied' : 'available'}`}>
    <p>
      <Link to={`/look/${roomId}`}>{roomName}</Link>
      <span className='time'>{timeStart} - {timeEnd}</span>
    </p>
    <h4 className='title'>{title}</h4>
    <p className='author'>
      <span>Host: </span>{host}
      </p>
    {!isHost && (<a className='attend' onClick={() => toggleMeetingStatus(id)}>{status ? 'Cancel' : 'Attend'}</a>)}
  </div>

);

OneMeeting.propTypes = {
  roomVal: PropTypes.string,
  roomId: PropTypes.string,
  title: PropTypes.string,
  host: PropTypes.string,
  time: PropTypes.string,
  status: PropTypes.bool,
  isHost: PropTypes.bool,
  toggleMeetingStatus: PropTypes.func
};

export default OneMeeting;
