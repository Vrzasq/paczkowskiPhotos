using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Commons;
using DbContract.Entities;
using DbContract.RepositoryContract;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using paczkowskiApi.Models;
using paczkowskiApi.security;

namespace paczkowskiApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        IRepository _repository;
        public RegisterController(IRepository repository)
        {
            _repository = repository;
        }
        // GET api/values
        [HttpPost]
        public ActionResult<string> NewUser(RegisterUserModel registerModel)
        {
            var user = new User
            {
                Email = registerModel.Email,
                Name = registerModel.Name,
                Password = CryptoPassword.GetPasswordHash(registerModel.Password)
            };

            var result = _repository.AddUser(user);
            return result;
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = AuthScheme.Cookies)]
        public ActionResult<IEnumerable<User>> GetAllUsers()
        {
            var result = _repository.GetAllUsers();
            return new JsonResult(result);
        }

        [HttpGet]
        public ActionResult<User> GetUser(string email)
        {
            var result = _repository.GetUserByEmail(email);
            return result;
        }

        [HttpPost]
        public ActionResult AddPhoto(string email)
        {
            return new EmptyResult();
        }
    }
}
