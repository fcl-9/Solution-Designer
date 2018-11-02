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
    [Route("dashboard/item/")]
    [ApiController]
    public class DashboardItemsController : ControllerBase
    {
        private readonly SolutionDesignerContext _context;

        public DashboardItemsController(SolutionDesignerContext context)
        {
            _context = context;
        }

        // GET: api/DashboardItems
        [HttpGet]
        public IEnumerable<DashboardItem> GetDashboardItem()
        {
            //List<DashboardItem> dashboardItem = _context.DashboardItem.Include(i => i.queries).Include(i => i.columns).ToList();
            //return _context.DashboardItem.Include(i => i.queries).Include(i => i.columns);
            throw new NotImplementedException();
        }

        // GET: api/DashboardItems/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDashboardItem([FromRoute] int? id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var dashboardItem = await _context.DashboardItem.FindAsync(id);

            if (dashboardItem == null)
            {
                return NotFound();
            }

            return Ok(dashboardItem);
        }

        // PUT: api/DashboardItems/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDashboardItem([FromRoute] int? id, [FromBody] DashboardItem dashboardItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != dashboardItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(dashboardItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DashboardItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(dashboardItem);
        }

        // POST: api/DashboardItems
        [HttpPost]
        public async Task<IActionResult> PostDashboardItem([FromBody] DashboardItem dashboardItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.DashboardItem.Add(dashboardItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDashboardItem", new { id = dashboardItem.Id }, dashboardItem);
        }

        // DELETE: api/DashboardItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDashboardItem([FromRoute] int? id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var dashboardItem = await _context.DashboardItem.FindAsync(id);
            if (dashboardItem == null)
            {
                return NotFound();
            }

            _context.DashboardItem.Remove(dashboardItem);
            await _context.SaveChangesAsync();

            return Ok(dashboardItem);
        }

        private bool DashboardItemExists(int? id)
        {
            return _context.DashboardItem.Any(e => e.Id == id);
        }
    }
}