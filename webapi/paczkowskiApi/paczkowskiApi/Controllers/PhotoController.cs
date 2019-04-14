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
                Photo photo = GetPhoto(photoModel);
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
        public ActionResult<IEnumerable<GetPhotosResult>> GetUserPhotos()
        {
            var user = HttpContext.Items["user"] as User;
            var result = _repository.GetUserPhotos(user);
            return new JsonResult(result.Select(x => new GetPhotosResult(x)));
        }

        private Photo GetPhoto(AddPhotoModel model)
        {
            User user = HttpContext.Items["user"] as User;
            return new Photo
            {
                User = user,
                Category = model.Category,
                DisplayName = model.DisplayName,
                FileName = model.FileName,
                PhotoNum = DateTime.Now.Ticks.ToString(),
                Image = Convert.FromBase64String(model.Base64Image)
            };
        }
    }
}
