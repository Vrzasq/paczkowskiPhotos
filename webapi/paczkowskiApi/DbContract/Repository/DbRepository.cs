using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Commons;
using DbContract.Entities;
using DbContract.RepositoryContract;
using DbContract.WebApiDbContext;
using Microsoft.EntityFrameworkCore;

namespace DbContract.Repository
{
    public class DbRepository : IRepository
    {
        ApiDbContext dbContext = new ApiDbContext(new DbContextOptions<ApiDbContext>());

        public void Dispose() =>
            dbContext.Dispose();

        public string AddPhoto(Photo photo)
        {
            dbContext.Add(photo);
            dbContext.SaveChanges();
            return "ok";
        }

        public string AddUser(User user)
        {
            try
            {
                dbContext.Add(user);
                dbContext.SaveChanges();
                return "ok";
            }
            catch (Exception ex)
            {
                return "not ok";
            }
        }

        public IEnumerable<User> GetAllUsers()
        {
            return dbContext.Users.ToListAsync().Result;
        }

        public User GetUserByEmail(string email) =>
            dbContext.Users.Where(user => user.Email == email.Sanitize()).First();

        public string GetPasswordHash(string email)
        {
            var user = dbContext.Users.Where(users => users.Email == email.Sanitize()).FirstOrDefault();
            if (user != null)
                return user.Password;
            return string.Empty;
        }

        public void AddLoggedUser(LoggedUser user)
        {
            dbContext.Add(user);
            dbContext.SaveChanges();
        }

        public void RemoveLoggedUser(string email)
        {
            var user = dbContext.LoggedUsers.Where(users => users.Email == email.Sanitize()).FirstOrDefault();
            if (user != null)
            {
                dbContext.Remove(user);
                dbContext.SaveChanges();
            }
        }

        public string GetActiveToken(string email)
        {
            var user = dbContext.LoggedUsers.Where(users => users.Email == email.Sanitize()).FirstOrDefault();
            if (user != null)
                return user.Token;
            return string.Empty;
        }
    }
}
