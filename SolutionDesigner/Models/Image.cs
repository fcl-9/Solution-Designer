using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Threading;
using Microsoft.AspNetCore.Http;

namespace SolutionDesigner.Models
{
    public class Image
    {
        [Key]
        public int id { get; set; }
        public string ContentType { get; set; }
        public string ContentDisposition { get; set; }
        public long Length { get; set; }
        public string Name { get; set; }
        public string FileName { get; set; }
        public byte[] imageBin { get; set; }
    }
}