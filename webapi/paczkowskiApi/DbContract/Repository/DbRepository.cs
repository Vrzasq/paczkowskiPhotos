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
            var user = dbContext.Users.Include(p => p.Photos).Single(u => u.Id == photo.User.Id);
            user.Photos.Add(photo);
            dbContext.SaveChanges();

            return "ok";
        }

        public string AddUser(User user)
        {
            try
            {
                var existingUser = dbContext.Users.Where(x => x.Email == user.Email).FirstOrDefault();

                if (existingUser != null)
                    throw new Exception($"User [{user.Email}] already exists");

                dbContext.Add(user);
                dbContext.SaveChanges();
                return "ok";
            }
            catch (Exception ex)
            {
                return ex.Message;
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

        public void AddLoggedUser(LoggedUser loggedUser)
        {
            var user = dbContext.LoggedUsers.Where(users => users.Email == loggedUser.Email.Sanitize()).FirstOrDefault();

            if (user != null)
            {
                user.Token = loggedUser.Token;
                dbContext.Update(user);
            }
            else
                dbContext.Add(loggedUser);

            dbContext.SaveChanges();
        }

        public void RemoveLoggedUser(string email)
        {
            if (email != null)
            {
                var user = dbContext.LoggedUsers.Where(users => users.Email == email.Sanitize()).FirstOrDefault();
                if (user != null)
                {
                    dbContext.Remove(user);
                    dbContext.SaveChanges();
                }
            }
        }

        public string GetActiveToken(string email)
        {
            if (email != null)
            {
                var user = dbContext.LoggedUsers.Where(users => users.Email == email.Sanitize()).FirstOrDefault();
                if (user != null)
                    return user.Token;
            }

            return string.Empty;
        }

        public IEnumerable<Photo> GetUserPhotos(User user)
        {
            var result = dbContext.Photos.Where(p => p.User.Id == user.Id);
            return result;
        }

        public void EditPhoto(Photo photo)
        {
            var dbPhoto = dbContext.Photos.Single(p => p.PhotoNum == photo.PhotoNum && p.User.Id == photo.User.Id);
            dbPhoto.Category = photo.Category;
            dbPhoto.DisplayName = photo.DisplayName;

            dbContext.Update(dbPhoto);
            dbContext.SaveChanges();
        }

        public void DeletePhoto(Photo photo)
        {
            var dbPhoto = dbContext.Photos.Single(p => p.PhotoNum == photo.PhotoNum && p.User.Id == photo.User.Id);
            dbContext.Remove(dbPhoto);
            dbContext.SaveChanges();
        }

        public IEnumerable<Category> GetUserCategories(User user) =>
            dbContext.Categories.Where(x => x.User.Id == user.Id);

        public string AddCategory(Category category)
        {
            try
            {
                var user = dbContext.Users.Include(p => p.Photos).Single(u => u.Id == category.User.Id);
                var existingCategory = user.Categories.FirstOrDefault(x => x.Name == category.Name);

                if (existingCategory != null)
                    throw new Exception($"Category [{category.Name}] alreadye exists");

                user.Categories.Add(category);
                dbContext.SaveChanges();
                return "ok";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public void DeleteCategory(Category category)
        {
            var dbPhoto = dbContext.Categories.Single(c => c.Name == category.Name && c.User.Id == c.User.Id);
            dbContext.Remove(dbPhoto);
            dbContext.SaveChanges();
        }
    }
}
