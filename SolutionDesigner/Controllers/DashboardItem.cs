using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using SolutionDesigner.Models;

namespace SolutionDesigner.Controllers
{
    [Route("dashboard/item/")]
    public class DashboardItemController : Controller
    {

        [HttpPost]
        public IActionResult Create([FromBody] DashboardItem dashboardItem)
        {
            Program.storage.Add(dashboardItem);
            // Save to database
            // Select ScopeIdentiy (not necessary)
            // After saving into the database property Id is set
            // So we simply return the object again;
            dashboardItem.Id = Program.id;
            Program.id += 1;
            Debug.Write(Program.storage.Count);
            return Ok(dashboardItem);
        }

        [HttpGet]
        public IActionResult Select()
        {
            Debug.Write(Program.storage.Count);
            return Ok(Program.storage);
        }

        [HttpGet("{id}")]
        public IActionResult Select(int id)
        {
            var position = Program.storage.FindIndex(dashItem => dashItem.Id == id);
            if (position == -1)
            {
                Debug.Write(Program.storage.Count);
                return NotFound("It was not possible to find the item on the database");
            }
            else
            {
                Debug.Write(Program.storage.Count);
                return Ok(Program.storage[position]);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] DashboardItem dashboardItem)
        {
            var position = Program.storage.FindIndex(dashItem => dashItem.Id == id);
            if (position == -1)
            {
                Debug.Write(Program.storage.Count);
                return NotFound("It was not possible to find the item on the database.");
            }
            else
            {
                Program.storage[position] = dashboardItem;
                Debug.Write(Program.storage.Count);
                return Ok(Program.storage[position]);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var position = Program.storage.FindIndex(dashItem => dashItem.Id == id);
            if (position == -1)
            {
                Debug.Write(Program.storage.Count);
                return NotFound("The item could not be found in the database.");
            }
            else
            {
                Debug.Write(Program.storage.Count);
                Program.storage.RemoveAt(position);
                return Ok();
            }
        }
    }
}