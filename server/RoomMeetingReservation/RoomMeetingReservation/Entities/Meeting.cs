using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RoomMeetingReservation.Entities
{

    public class Meeting
    {
        public string _id { get; set; }
        public Array attendees { get; set; }
        public Room room { get; set; }
        public string title { get; set; }
        public string hostId { get; set; }
        public string startTime { get; set; }
        public string endTime { get; set; }
        public bool isHost { get; set; }
        public bool status { get; set; }
    }
}
