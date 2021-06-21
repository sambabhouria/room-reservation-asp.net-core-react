
using Microsoft.AspNetCore.Mvc;
using RoomMeetingReservation.Helpers;
using RoomMeetingReservation.Models;
using RoomMeetingReservation.Services;

namespace RoomMeetingReservation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomsController : ControllerBase
    {
        private IUserService _userService;

        public RoomsController(IUserService userService)
        {
            _userService = userService;
        }


        [HttpGet]
        public IActionResult GetAll()
        {
            var rooms = _userService.GetAllRooms();
            return Ok(rooms);
        }
    }
}