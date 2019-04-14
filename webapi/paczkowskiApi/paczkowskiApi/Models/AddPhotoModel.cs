using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace paczkowskiApi.Models
{
    public class AddPhotoModel
    {
        public string DisplayName { get; set; }
        public string FileName { get; set; }
        public string Category { get; set; }
        public string Base64Image { get; set; }
    }
}
