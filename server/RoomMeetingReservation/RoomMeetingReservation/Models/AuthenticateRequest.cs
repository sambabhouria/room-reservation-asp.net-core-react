using RoomMeetingReservation.Entities;
using System.ComponentModel.DataAnnotations;

namespace RoomMeetingReservation.Models
{
    public class AuthenticateRequest
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}