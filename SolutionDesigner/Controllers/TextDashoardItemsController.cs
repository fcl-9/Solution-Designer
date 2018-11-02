using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SolutionDesigner.Models;

namespace SolutionDesigner.Controllers
{
    [Route("dashboard/component")]
    [ApiController]
    public class TextDashoardItemsController : ControllerBase
    {
        private readonly SolutionDesignerContext _context;

        public TextDashoardItemsController(SolutionDesignerContext context)
        {
            _context = context;
        }

        // GET: api/TextDashoardItems
        [HttpGet]
        public IEnumerable<TextDashoardItem> GetTextDashoardItem()
        {
            // List<TextDashoardItem> dashboardItem = _context.TextDashoardItem.ToList();
            return _context.TextDashoardItem.Include(i => i.TextOptions); 
        }

        // GET: api/TextDashoardItems/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTextDashoardItem([FromRoute] int? id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var textDashoardItem = await _context.TextDashoardItem.FindAsync(id);

            if (textDashoardItem == null)
            {
                return NotFound();
            }

            return Ok(textDashoardItem);
        }

        // PUT: api/TextDashoardItems/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTextDashoardItem([FromRoute] int? id, [FromBody] TextDashoardItem textDashoardItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != textDashoardItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(textDashoardItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TextDashoardItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(textDashoardItem);
        }

        // POST: api/TextDashoardItems
        [HttpPost]
        public async Task<IActionResult> PostTextDashoardItem([FromBody] TextDashoardItem textDashoardItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.TextDashoardItem.Add(textDashoardItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTextDashoardItem", new { id = textDashoardItem.Id }, textDashoardItem);
        }

        // DELETE: api/TextDashoardItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTextDashoardItem([FromRoute] int? id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var textDashoardItem = await _context.TextDashoardItem.FindAsync(id);
            if (textDashoardItem == null)
            {
                return NotFound();
            }

            _context.TextDashoardItem.Remove(textDashoardItem);
            await _context.SaveChangesAsync();

            return Ok(textDashoardItem);
        }

        private bool TextDashoardItemExists(int? id)
        {
            return _context.TextDashoardItem.Any(e => e.Id == id);
        }
    }
}