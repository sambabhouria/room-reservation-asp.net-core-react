import React, { Component } from 'react';
import axios from 'axios';

import Header from '../Header/Header';
import MeetingsList from './MeetingsList';
import BookForm from '../Forms/BookForm';

export default class Look extends Component {
  state = {
    scrolled: false,
    formIsOpened: false,
  }

  componentWillMount = () => {
    this.fetchRoomInfo();
    this.fetchMeetingsList();
  }

  componentDidMount = () => { window.addEventListener('scroll', this.handleScroll); }

  componentWillUnmount = () => { window.removeEventListener('scroll', this.handleScroll); }

  shouldComponentUpdate = (nextProps, nextState) => {
    if((this.props.match.path !== nextProps.match.path)
      || (JSON.stringify(this.state.timeline) !== JSON.stringify(nextState.timeline))
      || (this.state.scrolled !== nextState.scrolled)
      || (this.state.formIsOpened !== nextState.formIsOpened)
    ) {
      return true;
    }

    return false;
  }

  componentDidUpdate = () => {
    this.fetchRoomInfo();
    this.fetchMeetingsList();
  }

  handleScroll = (event) => {
    let top = event.srcElement.body.scrollTop;

    //room-photo height (200px) - header (50px)
    if(top > 150) { if(!this.state.scrolled) this.setState({scrolled: true}); }
    else { if(this.state.scrolled) this.setState({scrolled: false}); }

  }

  toggleMeetingStatus = (meetingId) => {
    const meetingsData = {
      meetingId: meetingId
    };

    axios.post('/api/meetings/status', meetingsData)
      .then(res => {
        this.fetchMeetingsList();
      })
      .catch(err => {
        console.log(err);
      });
  }

  toggleBookForm = (roomId, roomName) => {
    this.setState({formIsOpened: !this.state.formIsOpened});
  }


  fetchMeetingsList = () => {

    const roomId = this.props.match.params.id;

    axios.get(`/api/meetings?roomId=${roomId}`)
         .then(res => this.setState({ timeline: res.data }));

  }

  fetchRoomInfo = () => {

    const roomId = this.props.match.params.id;

    if(roomId !== undefined){
      axios.get(`/api/meetings/roominfo?roomId=${roomId}`)
           .then(res => this.setState({ roomInfo: res.data[0] }));
    } else {
      this.setState({ roomInfo: { photo: '', name: '' } });
    }

  }

  render() {
    const roomId = this.props.match.params.id;
    const { formIsOpened, roomInfo, scrolled, timeline } = this.state;

    // will be replace with api call fore
    const  Mocktimelinearray = [
      {
        "_id":"60ce4853731a2ca673458e1f",
       "attendees":[],
       "room":{"_id":"60ce44b6caf94e0f31abba41","value":"Room0","photo":"https://s3.eu-west-2.amazonaws.com/book-room-platform/airbnb.jpg"},
       "title":"Spiring  Planning",
       "hostId":{"_id":"60ce3b304eeb86a429012de3","username":"test"},
       "startTime":"2021-07-11T06:00:00.000Z",
       "endTime":"2021-07-11T08:00:00.000Z",
       "isHost":true,
       "status":false
      },
      {
        "_id":"60ce4853731a2ca673458e1f",
       "attendees":[],
       "room":{"_id":"60ce44b6caf94e0f31abba41","value":"Room1","photo":"https://s3.eu-west-2.amazonaws.com/book-room-platform/airbnb.jpg"},
       "title":"Poker  Planning",
       "hostId":{"_id":"60ce3b304eeb86a429012de3","username":"test"},
       "startTime":"2021-07-11T06:00:00.000Z",
       "endTime":"2021-07-11T08:00:00.000Z",
       "isHost":true,
       "status":false
      }

    ]

    console.log("value of the staes", this.state)

    if(roomInfo === undefined) return <div className='loader'></div>;
    return (
    <div className='look'>
      <div className={`wrap ${scrolled ? 'scrolled' : ''}`}>
        <Header openBookForm={this.toggleBookForm} />

        {roomId ?
        <div className='room-photo' style={{backgroundImage: `url('${roomInfo.photo}')`}}></div> :
        <div className='room-photo personal'></div>
        }

        <div className='timeline'>
          <div className='timeline-header'>
            <div className='container'>

              {roomId ?
              <h3 className='title'>Room Schedule | {roomInfo.value}</h3> :
              <h3 className='title'>Personal Schedule</h3>
              }

            </div>
          </div>

          {Mocktimelinearray &&
            <MeetingsList
              meetings={Mocktimelinearray}
              toggleMeetingStatus={this.toggleMeetingStatus}
              />
          }

          </div>
        </div>

        <BookForm
          isOpened={formIsOpened}
          closeBookForm={this.toggleBookForm}
        />
      </div>
    );
  }
}
