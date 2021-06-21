using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RoomMeetingReservation.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RoomMeetingReservation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MeetingsController : ControllerBase
    {
        private IUserService _userService;

        public MeetingsController(IUserService userService)
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