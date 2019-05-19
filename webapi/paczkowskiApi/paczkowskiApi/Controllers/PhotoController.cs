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

namespace paczkowskiApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PhotoController : ControllerBase
    {
        private readonly IRepository _repository;

        private User LoggedUser =>
            HttpContext.Items["user"] as User;


        public PhotoController(IRepository repository)
        {
            _repository = repository;
        }

        // POST api/values
        [HttpPost]
        [Authorize(AuthenticationSchemes = AuthScheme.Cookies)]
        public ActionResult<bool> AddPhoto(AddPhotoModel photoModel)
        {
            try
            {
                Photo photo = GetPhotoEntity(photoModel);
                _repository.AddPhoto(photo);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = AuthScheme.Cookies)]
        public ActionResult<IEnumerable<GetPhotosResult>> GetPhotos()
        {
            var photos = _repository.GetUserPhotos(LoggedUser);
            var result = photos.Select(x => new GetPhotosResult(x)).ToArray();

            return result;
        }

        [HttpPut]
        [Authorize(AuthenticationSchemes = AuthScheme.Cookies)]
        public ActionResult<bool> EditPhoto(EditPhotoModel photoModel)
        {
            try
            {
                var photo = new Photo
                {
                    PhotoNum = photoModel.PhotoNum,
                    Category = photoModel.Category,
                    DisplayName = photoModel.DisplayName,
                    User = LoggedUser
                };

                _repository.EditPhoto(photo);

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        [HttpDelete]
        [Authorize(AuthenticationSchemes = AuthScheme.Cookies)]
        public ActionResult<bool> DeletePhoto(DeletePhotoModel photoModel)
        {
            try
            {
                _repository.DeletePhoto(new Photo { PhotoNum = photoModel.PhotoNum, User = LoggedUser });
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = AuthScheme.Cookies)]
        public ActionResult<bool> AddCategory(CategoryModel model)
        {
            string result = _repository.AddCategory(new Category { Name = model.Name, User = LoggedUser });

            if (result != "ok")
                return false;

            return true;
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = AuthScheme.Cookies)]
        public ActionResult<IEnumerable<CategoryModel>> GetCategories()
        {
            var categories = _repository.GetUserCategories(LoggedUser);
            var result = categories.Select(x => new CategoryModel { Name = x.Name }).ToArray();

            return result;
        }

        [HttpDelete]
        [Authorize(AuthenticationSchemes = AuthScheme.Cookies)]
        public ActionResult<bool> DeleteCategory(CategoryModel model)
        {
            try
            {
                var category = new Category { Name = model.Name, User = LoggedUser };
                _repository.DeleteCategory(category);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        private Photo GetPhotoEntity(AddPhotoModel model)
        {
            return new Photo
            {
                User = LoggedUser,
                Category = model.Category,
                DisplayName = model.DisplayName,
                FileName = model.FileName,
                PhotoNum = DateTime.Now.Ticks.ToString(),
                Image = model.Image
            };
        }


    }
}
