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
    [Route("dashboard/app")]
    [ApiController]
    public class AppDashboardItemsController : ControllerBase
    {
        private readonly SolutionDesignerContext _context;

        public AppDashboardItemsController(SolutionDesignerContext context)
        {
            _context = context;
        }

        // GET: api/AppDashboardItems
        [HttpGet]
        public IEnumerable<AppDashboardItem> GetAppDashboardItem()
        {
            return _context.AppDashboardItem;
        }

        // GET: api/AppDashboardItems/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAppDashboardItem([FromRoute] int? id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var appDashboardItem = await _context.AppDashboardItem.FindAsync(id);

            if (appDashboardItem == null)
            {
                return NotFound();
            }

            return Ok(appDashboardItem);
        }

        // PUT: api/AppDashboardItems/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAppDashboardItem([FromRoute] int? id, [FromBody] AppDashboardItem appDashboardItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != appDashboardItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(appDashboardItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AppDashboardItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(appDashboardItem);
        }

        // POST: api/AppDashboardItems
        [HttpPost]
        public async Task<IActionResult> PostAppDashboardItem([FromBody] AppDashboardItem appDashboardItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.AppDashboardItem.Add(appDashboardItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAppDashboardItem", new { id = appDashboardItem.Id }, appDashboardItem);
        }

        // DELETE: api/AppDashboardItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAppDashboardItem([FromRoute] int? id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var appDashboardItem = await _context.AppDashboardItem.FindAsync(id);
            if (appDashboardItem == null)
            {
                return NotFound();
            }

            _context.AppDashboardItem.Remove(appDashboardItem);
            await _context.SaveChangesAsync();

            return Ok(appDashboardItem);
        }

        private bool AppDashboardItemExists(int? id)
        {
            return _context.AppDashboardItem.Any(e => e.Id == id);
        }
    }
}