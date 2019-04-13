﻿using System.Security.Claims;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using Commons;
using DbContract.Repository;
using DbContract.RepositoryContract;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace paczkowskiApi.security
{
    public class AuthCookieHanlder : AuthenticationHandler<AuthenticationSchemeOptions>
    {
        public AuthCookieHanlder(IOptionsMonitor<AuthenticationSchemeOptions> options, ILoggerFactory logger, UrlEncoder encoder, ISystemClock clock) : base(options, logger, encoder, clock)
        {

        }

        protected override Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            var cookies = Request.Cookies;
            Task<AuthenticateResult> result = Task.FromResult(AuthenticateResult.NoResult());

            string authToken = cookies[CookieName.AuthToken];
            AuthTokenBlob tokenBlob = TokenEncryption.Decrypt(authToken);

            if (IsAuthorized(tokenBlob))
            {
                var identity = new ClaimsIdentity(nameof(AuthCookieHanlder));
                var ticket = new AuthenticationTicket(new ClaimsPrincipal(identity), Scheme.Name);
                result = Task.FromResult(AuthenticateResult.Success(ticket));
            }

            return result;
        }

        private bool IsAuthorized(AuthTokenBlob tokenBlob)
        {
            using (IRepository repo = new DbRepository())
            {
                string token = repo.GetActiveToken(tokenBlob.Email);
                return token == tokenBlob.Token;
            }
        }
    }
}
