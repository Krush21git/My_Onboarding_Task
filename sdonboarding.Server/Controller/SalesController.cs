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
            var sales = await _context.Sales.ToListAsync();

            if (sales.Count > 0)
            {
                return Ok(sales.Select(SaleMapper.EntitytoDto).ToList());
            }
            else
            {
                return BadRequest("There are no sales.");
            }
        }

        // GET: api/Sales/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SaleDto>> GetSale(int id)
        {
            var sale = await _context.Sales.FindAsync(id);

            if (sale == null)
            {
                return NotFound("Sale not found.");
            }

            return SaleMapper.EntitytoDto(sale);
        }

        // PUT: api/Sales/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSale(int id, SaleDto saleDto)
        {
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
            var sale = await _context.Sales.FindAsync(id);
            if (sale == null)
            {
                return NotFound("Sale not found.");
            }

            _context.Sales.Remove(sale);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SaleExists(int id)
        {
            return _context.Sales.Any(e => e.Id == id);
        }
    }
}
