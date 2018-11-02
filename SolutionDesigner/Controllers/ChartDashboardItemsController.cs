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
    [Route("dashboard/chart")]
    [ApiController]
    public class ChartDashboardItemsController : ControllerBase
    {
        private readonly SolutionDesignerContext _context;

        public ChartDashboardItemsController(SolutionDesignerContext context)
        {
            _context = context;
        }

        // GET: api/ChartDashboardItems
        [HttpGet]
        public IEnumerable<ChartDashboardItem> GetChartDashboardItem()
        {
            return _context.ChartDashboardItem.Include(i => i.queries).Include(i => i.columns); ;
        }

        // GET: api/ChartDashboardItems/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetChartDashboardItem([FromRoute] int? id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var chartDashboardItem = await _context.ChartDashboardItem.FindAsync(id);

            if (chartDashboardItem == null)
            {
                return NotFound();
            }

            return Ok(chartDashboardItem);
        }

        // PUT: api/ChartDashboardItems/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutChartDashboardItem([FromRoute] int? id, [FromBody] ChartDashboardItem chartDashboardItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != chartDashboardItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(chartDashboardItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ChartDashboardItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(chartDashboardItem);
        }

        // POST: api/ChartDashboardItems
        [HttpPost]
        public async Task<IActionResult> PostChartDashboardItem([FromBody] ChartDashboardItem chartDashboardItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.ChartDashboardItem.Add(chartDashboardItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetChartDashboardItem", new { id = chartDashboardItem.Id }, chartDashboardItem);
        }

        // DELETE: api/ChartDashboardItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteChartDashboardItem([FromRoute] int? id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var chartDashboardItem = await _context.ChartDashboardItem.FindAsync(id);
            if (chartDashboardItem == null)
            {
                return NotFound();
            }

            _context.ChartDashboardItem.Remove(chartDashboardItem);
            await _context.SaveChangesAsync();

            return Ok(chartDashboardItem);
        }

        private bool ChartDashboardItemExists(int? id)
        {
            return _context.ChartDashboardItem.Any(e => e.Id == id);
        }
    }
}