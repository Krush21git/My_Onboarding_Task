using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sdonboarding.Server.Dtos;
using sdonboarding.Server.Models;
using sdonboarding.Server.Mappers;

namespace sdonboarding.Server.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private readonly OnBoardingProjectContext _context;

        public SalesController(OnBoardingProjectContext context)
        {
            _context = context;
        }

        // GET: api/Sales
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SaleDto>>> GetSales()
        {
            try
            {
                // Fetch the sales from the database
                var sales = await _context.Sales.ToListAsync();

                if (sales.Count > 0)
                {
                    // Map the sales entities to DTOs and return them
                    return Ok(sales.Select(SaleMapper.EntitytoDto).ToList());
                }
                else
                {
                    // Return a 400 Bad Request if no sales are found
                    return BadRequest("There are no sales.");
                }
            }
            catch (Exception ex)
            {
                // Log the exception (use a proper logging framework in production)
                Console.WriteLine($"An error occurred: {ex.Message}");

                // Return a 500 Internal Server Error response
                return StatusCode(500, "An error occurred while retrieving sales.");
            }

        }

        // GET: api/Sales/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SaleDto>> GetSale(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid sale ID provided.");
            }

            try
            {
                // Attempt to find the sale by ID
                var sale = await _context.Sales.FindAsync(id);

                if (sale == null)
                {
                    return NotFound("Sale not found.");
                }

                // Map the sale entity to a DTO and return the result
                return Ok(SaleMapper.EntitytoDto(sale));
            }
            catch (Exception ex)
            {
                // Log the exception (use a proper logging framework in production)
                Console.WriteLine($"An error occurred: {ex.Message}");

                // Return a generic error response
                return StatusCode(500, "An error occurred while retrieving the sale.");
            }

        }

            // PUT: api/Sales/5
            [HttpPut("{id}")]
        public async Task<IActionResult> PutSale(int id, SaleDto saleDto)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid sale ID provided.");
            }

            if (id != saleDto.Id)
            {
                return BadRequest("Sale ID mismatch.");
            }

            var existingSale = await _context.Sales.FindAsync(id);
            if (existingSale == null)
            {
                return NotFound("Sale not found.");
            }

            SaleMapper.UpdateEntityFromDto(existingSale, saleDto);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SaleExists(id))
                {
                    return NotFound("Sale no longer exists.");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Sales
        [HttpPost]
        public async Task<ActionResult<SaleDto>> PostSale(SaleDto saleDto)
        {
            var sale = SaleMapper.DtotoEntity(saleDto);

            _context.Sales.Add(sale);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSale", new { id = sale.Id }, SaleMapper.EntitytoDto(sale));
        }

        // DELETE: api/Sales/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSale(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid sale ID provided.");
            }

            try
            {
                // Attempt to find the sale by ID
                var sale = await _context.Sales.FindAsync(id);

                if (sale == null)
                {
                    return NotFound("Sale not found.");
                }

                // Remove the sale from the database
                _context.Sales.Remove(sale);
                await _context.SaveChangesAsync();

                // Return 204 No Content response
                return NoContent();
            }
            catch (Exception ex)
            {
                // Log the exception (use a proper logging framework in production)
                Console.WriteLine($"An error occurred: {ex.Message}");

                // Return a 500 Internal Server Error response
                return StatusCode(500, "An error occurred while deleting the sale.");
            }

        }

        private bool SaleExists(int id)
        {
            return _context.Sales.Any(e => e.Id == id);
        }
    }
}
