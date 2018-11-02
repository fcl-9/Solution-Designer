using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SolutionDesigner.Models;

namespace SolutionDesigner.Controllers
{
    [Route("dashboard/image")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly SolutionDesignerContext _context;

        public ImagesController(SolutionDesignerContext context)
        {
            _context = context;
        }

        // GET: api/Images
        [HttpGet]
        public IEnumerable<Image> GetImage()
        {
            return _context.Image;
        }

        // GET: api/Images/5
        //[HttpGet("{id}")]
        //public async Task<IActionResult> GetImage([FromRoute] int id)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    var image = await _context.Image.FindAsync(id);

        //    if (image == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(image);
        //}

        //// PUT: api/Images/5
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutImage([FromRoute] int id, [FromBody] Image image)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (id != image.id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(image).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!ImageExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        // POST: api/Images
        [HttpPost]
        public async Task<IActionResult> PostImage(IFormFile image)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            var newImage = new Image();
            newImage.ContentType = image.ContentType;
            newImage.ContentDisposition = image.ContentDisposition;
            newImage.Length = image.Length;
            newImage.Name = image.Name;
            newImage.FileName =image.FileName;
            using (var memoryStream = new MemoryStream())
            {
                await image.CopyToAsync(memoryStream);
                newImage.imageBin = memoryStream.ToArray();
            }

            _context.Image.Add(newImage);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetImage", new { id = newImage.id }, newImage);
        }

        // DELETE: api/Images/
        [HttpDelete]
        public async Task<IActionResult> DeleteImage()
        {
            _context.Image.RemoveRange(_context.Image);
            await _context.SaveChangesAsync();
            return Ok();
        }

        private bool ImageExists(int id)
        {
            return _context.Image.Any(e => e.id == id);
        }
    }
}