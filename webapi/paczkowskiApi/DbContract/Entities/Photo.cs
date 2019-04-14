using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DbContract.Entities
{
    public class Photo
    {
        [Key]
        public int Id { get; set; }
        public string PhotoNum { get; set; }
        public string DisplayName { get; set; }
        public string FileName { get; set; }
        public string Category { get; set; }
        public byte[] Image { get; set; }

        public User User { get; set; }
    }
}
