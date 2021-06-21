using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using RoomMeetingReservation.Entities;
using RoomMeetingReservation.Helpers;
using RoomMeetingReservation.Models;

namespace RoomMeetingReservation.Services
{
    public interface IUserService
    {
        AuthenticateResponse Authenticate(AuthenticateRequest model);

        // User
        IEnumerable<User> GetAll();
        User GetById(int id);

        // Room 
        IEnumerable<Room> GetAllRooms();
        Room GetRoomById(string id);


        // Meetings 
        IEnumerable<Room> GetAllMeetings();
        Room GetMeetingById(string id);
    }

    public class UserService : IUserService
    {
        // users hardcoded for simplicity, store in a db with hashed passwords in production applications
        private List<User> _users = new List<User>
        {
            new User { Id = 1, FirstName = "Test", LastName = "User", Username = "test", Password = "test" }
        };

        //roo hardcoded for simplicity, store in a db with hashed passwords in production applications
        private List<Room> _rooms = new List<Room>
        {
                new Room(){ _id = "5974b5b603c1f994e368abc8", value="Room0", photo="https://s3.eu-west-2.amazonaws.com/book-room-platform/autodesk.jpg"},
                new Room(){ _id = "5974b5b603c1f994e368abc9", value="Room1", photo="https://s3.eu-west-2.amazonaws.com/book-room-platform/condenastent.jpg"},
                new Room(){ _id = "5974b5b603c1f994e368abca", value="Room2", photo="https://s3.eu-west-2.amazonaws.com/book-room-platform/airbnb.jpg"},
                new Room(){ _id = "5974b5b603c1f994e368abcb", value="Room3", photo="https://s3.eu-west-2.amazonaws.com/book-room-platform/decom.jpg"},
                new Room(){ _id = "5974b5b603c1f994e368abcc", value="Room4", photo="https://s3.eu-west-2.amazonaws.com/book-room-platform/fairphone.jpg"},
                new Room(){ _id = "5974b5b603c1f994e368abcd", value="Room5", photo="https://s3.eu-west-2.amazonaws.com/book-room-platform/zendesk.jpg"},
                new Room(){ _id = "5974b5b603c1f994e368abce", value="Room6", photo="https://s3.eu-west-2.amazonaws.com/book-room-platform/loft.jpg"},
                new Room(){ _id = "5974b5b603c1f994e368abcf", value="Room7", photo="https://s3.eu-west-2.amazonaws.com/book-room-platform/isisoffice.jpg"},
                new Room(){ _id = "5974b5b603c1f994e368abd0", value="Room8", photo="https://s3.eu-west-2.amazonaws.com/book-room-platform/loft.jpg"},
                new Room(){ _id = "5974b5b603c1f994e368abd1", value="Room9", photo="https://s3.eu-west-2.amazonaws.com/book-room-platform/skyscanner.jpg"},
        };

        private readonly AppSettings _appSettings;

        public UserService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        public AuthenticateResponse Authenticate(AuthenticateRequest model)
        {
            var user = _users.SingleOrDefault(x => x.Username == model.Username && x.Password == model.Password);

            // return null if user not found
            if (user == null) return null;

            // authentication successful so generate jwt token
            var token = generateJwtToken(user);

            return new AuthenticateResponse(user, token);
        }

        public IEnumerable<User> GetAll()
        {
            return _users;
        }

        public User GetById(int id)
        {
            return _users.FirstOrDefault(x => x.Id == id);
        }

        // helper methods

        private string generateJwtToken(User user)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public IEnumerable<Room> GetAllRooms()
        {
            return _rooms;
        }

        public Room GetRoomById(string id)
        {
            return _rooms.FirstOrDefault(x => x._id == id);
        }

        public IEnumerable<Room> GetAllMeetings()
        {
            throw new NotImplementedException();
        }

        public Room GetMeetingById(string id)
        {
            throw new NotImplementedException();
        }
    }
}