using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sdonboarding.Server.Dtos;
using sdonboarding.Server.Models;
using sdonboarding.Server.Mappers;

namespace sdonboarding.Server.Controller
{
  
    [Route("api/[controller]")]
    [ApiController]

    public class CustomersController : ControllerBase
    {
        private readonly OnBoardingProjectContext _context;

        public CustomersController(OnBoardingProjectContext context)
        {
            _context = context;
        }

        // GET: api/Customers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomerDto>>> GetCustomers()
        {
            var _customers = await _context.Customers.ToListAsync();

            if(_customers.Count >0)
            {
                return Ok(_customers);
            }
            else
            {
                return BadRequest("There are no customer");
            }
        }

        // GET: api/Customers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CustomerDto>> GetCustomer(int id)
        {
            var customer = await _context.Customers.FindAsync(id);

            if (customer == null)
            {
                return NotFound();
            }

            return CustomerMapper.EntitytoDto(customer);
        }


        // PUT: api/Customers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomer(int id, CustomerDto customerDto)
        {
            // Validate if the ID in the URL matches the ID in the DTO
            if (id != customerDto.Id)
            {
                return BadRequest("Customer ID mismatch.");
            }

            // Check if the customer exists in the database
            var existingCustomer = await _context.Customers.FindAsync(id);
            if (existingCustomer == null)
            {
                return NotFound("Customer not found.");
            }

            // Map the DTO to the existing entity
            CustomerMapper.UpdateEntityFromDto(existingCustomer, customerDto);

            try
            {
                // Save changes to the database
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
                {
                    return NotFound("Customer no longer exists.");
                }
                else
                {
                    throw; // Re-throw the exception if it's not related to concurrency
                }
            }

            return NoContent(); // Return 204 No Content on success
        }


        // POST: api/Customers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Customer>> PostCustomer(CustomerDto customer)
        {
            var entity = CustomerMapper.DtotoEntity(customer);

            _context.Customers.Add(entity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCustomer", new { id = customer.Id }, CustomerMapper.EntitytoDto(entity));
        }

        // DELETE: api/Customers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CustomerExists(int id)
        {
            return _context.Customers.Any(e => e.Id == id);
        }
    }
}
