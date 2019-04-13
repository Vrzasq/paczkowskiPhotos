using Commons;
using DbContract.Entities;
using DbContract.RepositoryContract;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using paczkowskiApi.Models;
using paczkowskiApi.security;

namespace paczkowskiApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IRepository _repository;

        public LoginController(IRepository repository)
        {
            _repository = repository;
        }

        [HttpPost]
        public ActionResult<LoginResult> Login(LoginModel loginModel)
        {
            var loginResult = new LoginResult();
            string userHash = CryptoPassword.GetPasswordHash(loginModel.Password);
            string dbHash = _repository.GetPasswordHash(loginModel.Email);

            if (userHash == dbHash)
            {
                BurnOldToken(loginModel.Email);
                AutheticateUser(loginModel.Email);
                loginResult.Success = true;
            }

            return loginResult;
        }

        private void AutheticateUser(string email)
        {
            var cookies = Response.Cookies;
            var authTokenBlob = new AuthTokenBlob(email, TokenProvider.NewAuthToken);
            PutAuthUserToDb(authTokenBlob);
            string encryptedBlob = TokenEncryption.Encrypt(authTokenBlob);
            cookies.Append(CookieName.AuthToken, encryptedBlob, new CookieOptions { HttpOnly = true, Path = "/" });
        }

        private void BurnOldToken(string email) =>
            _repository.RemoveLoggedUser(email);


        private void PutAuthUserToDb(AuthTokenBlob authTokenBlob)
        {
            LoggedUser loggedUser = new LoggedUser
            {
                Email = authTokenBlob.Email,
                Token = authTokenBlob.Token
            };

            _repository.AddLoggedUser(loggedUser);
        }
    }
}
